"use client"

import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BookOpen, Droplet, Apple, HeartPulse, Salad } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { AnalysisResults, FoodRecommendation } from "./components/analysis-results"
import Image from "next/image"

interface BloodValues {
  Blood_Colesterolo: number
  Blood_Colesterolo_HDL: number
  Blood_Trigliceridi: number
  Blood_Glucosio: number
  Blood_Vitamina_D: number
  Blood_Ferro: number
  Blood_Creatinina: number
}

type Recommendation = string;  // o il tipo effettivo dei tuoi dati

export default function HomePage() {
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<FoodRecommendation[]>([])
  const [values, setValues] = useState({
    age: "",
    sex: "",
    diet: "omnivorous",
    allergies: {
      lactose: false,
      gluten: false,
      nuts: false,
      eggs: false
    },
    bloodValues: {
      Blood_Colesterolo: "",
      Blood_Colesterolo_HDL: "",
      Blood_Trigliceridi: "",
      Blood_Glucosio: "",
      Blood_Vitamina_D: "",
      Blood_Ferro: "",
      Blood_Creatinina: ""
    }
  })

  const handleInputChange = (field: string, value: string) => {
    // Sostituisce la virgola con il punto per i valori decimali
    const normalizedValue = value.replace(',', '.');
    
    if (field.startsWith("Blood_")) {
      setValues(prev => ({
        ...prev,
        bloodValues: {
          ...prev.bloodValues,
          [field]: normalizedValue
        }
      }))
    } else {
      setValues(prev => ({
        ...prev,
        [field]: normalizedValue
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const age = parseInt(values.age)
    if (age < 10 || age > 95) {
      alert('Age must be between 10 and 95 years.')
      setShowResults(false)
      setRecommendations([])
      return
    }

    // Controlla se ci sono valori critici
    const hasCriticalValues = Object.entries(values.bloodValues).some(
      ([field, value]) => isDangerRange(field, value as string)
    );

    if (hasCriticalValues) {
      alert('Warning: some values are outside the normal range. It is recommended to consult a doctor before proceeding with the analysis.')
      setShowResults(false)
      setRecommendations([])
      return
    }

    setLoading(true)

    try {
      const payload = {
        age: parseInt(values.age),
        sex: values.sex,
        blood_values: Object.entries(values.bloodValues).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: parseFloat(value as string)
        }), {})
      }
      
      console.log('Sending payload:', payload) // Debug

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }, 
        mode: 'cors',
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server response:', errorText)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log('Received data:', data) // Debug
      
      // Usa la nuova funzione che considera sia dieta che allergie
      const filteredRecommendations = filterFoodsByDietAndAllergies(data, values.diet, values.allergies);
      setRecommendations(filteredRecommendations);
      setShowResults(true);
    } catch (error) {
      console.error('Error details:', error)
      alert('An error occurred during the analysis. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isWarningRange = (field: string, value: string): boolean => {
    const normalizedValue = value.replace(',', '.');
    const numValue = parseFloat(normalizedValue);
    if (isNaN(numValue)) return false;
    
    switch (field) {
      case 'Blood_Ferro':
        return values.sex === 'M' 
          ? (numValue >= 65 && numValue <= 80) || (numValue >= 177 && numValue <= 200)
          : (numValue >= 50 && numValue <= 60) || (numValue >= 171 && numValue <= 200);
      case 'Blood_Colesterolo':
        return (numValue >= 120 && numValue <= 140) || (numValue >= 200 && numValue <= 240);
      case 'Blood_Colesterolo_HDL':
        return values.sex === 'M'
          ? (numValue >= 30 && numValue <= 40) || numValue > 80
          : (numValue >= 30 && numValue < 50) || numValue > 80;
      case 'Blood_Trigliceridi':
        return numValue >= 150 && numValue <= 200;
      case 'Blood_Glucosio':
        return (numValue >= 50 && numValue <= 69) || (numValue >= 100 && numValue <= 125);
      case 'Blood_Creatinina':
        return values.sex === 'M'
          ? (numValue >= 0.4 && numValue < 0.7) || (numValue > 1.2 && numValue <= 2)
          : (numValue >= 0.4 && numValue < 0.6) || (numValue > 1.1 && numValue <= 2);
      case 'Blood_Vitamina_D':
        return (numValue >= 10 && numValue <= 29) || (numValue >= 50 && numValue <= 70);
      default:
        return false;
    }
  };

  const isDangerRange = (field: string, value: string): boolean => {
    const normalizedValue = value.replace(',', '.');
    const numValue = parseFloat(normalizedValue);
    if (isNaN(numValue)) return false;
    
    switch (field) {
      case 'Blood_Ferro':
        return values.sex === 'M' 
          ? (numValue < 65 || numValue > 200)
          : (numValue < 50 || numValue > 200);
      case 'Blood_Colesterolo':
        return numValue < 120 || numValue > 240;
      case 'Blood_Colesterolo_HDL':
        return values.sex === 'M'
          ? numValue < 30
          : numValue < 30;
      case 'Blood_Trigliceridi':
        return numValue < 40 || numValue > 200;
      case 'Blood_Glucosio':
        return numValue < 50 || numValue > 125;
      case 'Blood_Creatinina':
        return values.sex === 'M'
          ? numValue < 0.4 || numValue > 2
          : numValue < 0.4 || numValue > 2;
      case 'Blood_Vitamina_D':
        return numValue < 10 || numValue > 100;
      default:
        return false;
    }
  };

  const hasWarningValues = () => {
    return Object.entries(values.bloodValues).some(
      ([field, value]) => isWarningRange(field, value as string)
    );
  };

  const hasDangerValues = () => {
    return Object.entries(values.bloodValues).some(
      ([field, value]) => {
        // Controlla che il valore esista e non sia una stringa vuota
        return value && value !== "" && isDangerRange(field, value as string);
      }
    );
  };

  // Aggiungi queste funzioni di utility per il filtraggio dei cibi
  const filterFoodsByDiet = (foods: FoodRecommendation[], diet: string) => {
    const nonVegetarianFoods = [
      ...getMacroCategory("Meats"),
      ...getMacroCategory("Fish and Seafood")
    ];

    const nonVeganFoods = [
      ...nonVegetarianFoods,
      ...getMacroCategory("Dairy Products"),
      ...getFoodsWithCategory("Contains Eggs")
    ];

    switch (diet) {
      case 'vegetarian':
        return foods.filter(food => 
          !nonVegetarianFoods.some(nonVegFood => 
            food.food.toLowerCase().includes(nonVegFood.toLowerCase())
          )
        );
      case 'vegan':
        return foods.filter(food => 
          !nonVeganFoods.some(nonVeganFood => 
            food.food.toLowerCase().includes(nonVeganFood.toLowerCase())
          )
        );
      default: // omnivorous
        return foods;
    }
  };

  const getMacroCategory = (category: string): string[] => {
    const categories: { [key: string]: string[] } = {
      "Meats": [
        "meat", "beef", "pork", "chicken", "turkey", "duck", "goose", 
        "liver", "bacon", "ham", "sausage", "stew", "burger", "tongue",
        "pigeon", "quail", "rabbit", "boar", "veal", "venison"
      ],
      "Fish and Seafood": [
        "fish", "seafood", "tuna", "salmon", "cod", "anchovy", "bass", 
        "bream", "clam", "crab", "mussel", "oyster", "shrimp", "lobster",
        "octopus", "eel", "mackerel", "sardine", "scallop", "sole", "squid"
      ],
      "Dairy Products": [
        "milk", "cheese", "butter", "yogurt", "dairy"
      ]
    };
    
    return categories[category] || [];
  };

  const getFoodsWithCategory = (category: string): string[] => {
    const categories: { [key: string]: string[] } = {
      "Contains Eggs": [
        "egg", "mayonnaise", "custard"
      ]
    };
    
    return categories[category] || [];
  };

  const filterFoodsByDietAndAllergies = (foods: FoodRecommendation[], diet: string, allergies: any) => {
    let filteredFoods = filterFoodsByDiet(foods, diet);
    
    if (allergies.lactose) {
      const lactoseFoods = [
        "milk", "cheese", "butter", "yogurt", "cream", "ice cream",
        "chocolate", "dairy"
      ];
      
      filteredFoods = filteredFoods.filter(food => {
        const foodLower = food.food.toLowerCase();
        const shouldKeep = !lactoseFoods.some(allergen => 
          foodLower.includes(allergen.toLowerCase())
        );
        if (!shouldKeep) {
          console.log('Removing lactose food:', food.food);
        }
        return shouldKeep;
      });
    }

    if (allergies.gluten) {
      const glutenFoods = [
        "wheat", "barley", "rye", "bread", "pasta", "cereal", "pizza",
        "noodle", "flour", "biscuit"
      ];
      
      filteredFoods = filteredFoods.filter(food => {
        const foodLower = food.food.toLowerCase();
        const shouldKeep = !glutenFoods.some(allergen => 
          foodLower.includes(allergen.toLowerCase())
        );
        if (!shouldKeep) {
          console.log('Removing gluten food:', food.food);
        }
        return shouldKeep;
      });
    }

    if (allergies.nuts) {
      const nutsFoods = [
        "nut", "almond", "hazelnut", "walnut", "pistachio", "cashew",
        "peanut", "pine nut", "pecan", "macadamia"
      ];
      
      filteredFoods = filteredFoods.filter(food => {
        const foodLower = food.food.toLowerCase();
        const shouldKeep = !nutsFoods.some(allergen => 
          foodLower.includes(allergen.toLowerCase())
        );
        if (!shouldKeep) {
          console.log('Removing nuts food:', food.food);
        }
        return shouldKeep;
      });
      console.log('After nuts filtering:', filteredFoods.length);
    }

    if (allergies.eggs) {
      const eggFoods = [
        "egg", "mayonnaise", "custard", "omelette"
      ];
      
      filteredFoods = filteredFoods.filter(food => {
        const foodLower = food.food.toLowerCase();
        // Aggiungiamo una condizione specifica per escludere "reggiano"
        if (foodLower.includes("reggiano")) {
          return true;  // mantieni il cibo se contiene "reggiano"
        }
        const shouldKeep = !eggFoods.some(allergen => 
          foodLower.includes(allergen.toLowerCase())
        );
        if (!shouldKeep) {
          console.log('Removing egg food:', food.food);
        }
        return shouldKeep;
      });
    }

    return filteredFoods;
  };

  return (
    <>
      <Head>
        <title>BloodBytes</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-white">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-b from-red-50/80 to-white">
                <CardHeader className="pb-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-white rounded-xl shadow-md">
                          <Image 
                            src="/logo.png" 
                            alt="BloodBytes Logo" 
                            width={32} 
                            height={32}
                          />
                        </div>
                        <CardTitle className="text-3xl font-bold text-red-600">
                          BloodBytes
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <CardDescription className="flex items-center gap-2 text-base">
                          <HeartPulse className="w-5 h-5 text-red-500" />
                          Transform your blood values into personalized nutrition
                        </CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      asChild 
                      className="bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <Link href="/blood-values" className="inline-flex items-center gap-2 whitespace-nowrap">
                        <BookOpen className="w-4 h-4" /> Values Guide
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-700">
                      <span className="font-semibold">Disclaimer:</span> 
                      The recommendations provided by this tool are for informational purposes only and should not be considered as medical advice. Always consult with a healthcare professional before making any changes to your diet or if you have concerns about your blood test results.
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8 relative px-8 pb-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                      <div className="relative">
                        <Label htmlFor="age" className="text-base font-medium">Age</Label>
                        <Input 
                          id="age" 
                          type="number"
                          min="10"
                          max="95"
                          placeholder="Enter your age" 
                          value={values.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          required
                          className="mt-2 w-full transition-all duration-200 focus:ring-2 focus:ring-red-100 bg-white"
                        />
                        <p className="text-sm text-muted-foreground mt-1.5 ml-1">
                          Allowed age: from 10 to 95 years
                        </p>
                      </div>

                      <div className="relative">
                        <Label htmlFor="sex" className="text-base font-medium">Sex</Label>
                        <Select 
                          value={values.sex} 
                          onValueChange={(value) => handleInputChange('sex', value)} 
                          required
                        >
                          <SelectTrigger id="sex" className="relative z-20 bg-white mt-2 w-full transition-all duration-200 focus:ring-2 focus:ring-red-100">
                            <SelectValue placeholder="Select sex" />
                          </SelectTrigger>
                          <SelectContent className="z-30 bg-white w-full">
                            <SelectItem value="M">Male</SelectItem>
                            <SelectItem value="F">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="diet">Diet Type</Label>
                        <Select value={values.diet} onValueChange={(value) => handleInputChange('diet', value)}>
                          <SelectTrigger id="diet" className="relative z-10 bg-white w-full">
                            <SelectValue placeholder="Select diet type" />
                          </SelectTrigger>
                          <SelectContent className="z-30 bg-white w-full">
                            <SelectItem value="omnivorous">Omnivorous</SelectItem>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Allergies and Intolerances</Label>
                        <p className="text-sm text-muted-foreground">
                          Select all allergies or intolerances you have
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="lactose" 
                              checked={values.allergies.lactose}
                              onCheckedChange={(checked) => 
                                setValues(prev => ({
                                  ...prev,
                                  allergies: { ...prev.allergies, lactose: checked as boolean }
                                }))
                              }
                            />
                            <Label htmlFor="lactose">Lactose</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="gluten"
                              checked={values.allergies.gluten}
                              onCheckedChange={(checked) => 
                                setValues(prev => ({
                                  ...prev,
                                  allergies: { ...prev.allergies, gluten: checked as boolean }
                                }))
                              }
                            />
                            <Label htmlFor="gluten">Gluten</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="nuts"
                              checked={values.allergies.nuts}
                              onCheckedChange={(checked) => 
                                setValues(prev => ({
                                  ...prev,
                                  allergies: { ...prev.allergies, nuts: checked as boolean }
                                }))
                              }
                            />
                            <Label htmlFor="nuts">Nuts</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="eggs"
                              checked={values.allergies.eggs}
                              onCheckedChange={(checked) => 
                                setValues(prev => ({
                                  ...prev,
                                  allergies: { ...prev.allergies, eggs: checked as boolean }
                                }))
                              }
                            />
                            <Label htmlFor="eggs">Eggs</Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="Blood_Colesterolo">Total Cholesterol (mg/dL)</Label>
                        <Input 
                          id="Blood_Colesterolo"
                          placeholder="Ex: 180"
                          value={values.bloodValues.Blood_Colesterolo}
                          onChange={(e) => handleInputChange('Blood_Colesterolo', e.target.value)}
                          className={`
                            ${isDangerRange('Blood_Colesterolo', values.bloodValues.Blood_Colesterolo) ? 'border-red-500 bg-red-50' : 
                              isWarningRange('Blood_Colesterolo', values.bloodValues.Blood_Colesterolo) ? 'border-yellow-500 bg-yellow-50' : ''}
                          `}
                          required
                        />
                        <p className={`text-sm mt-1 ${isWarningRange('Blood_Colesterolo', values.bloodValues.Blood_Colesterolo) ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                          Normal value: {"<"} 200 mg/dL
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="Blood_Colesterolo_HDL">HDL Cholesterol (mg/dL)</Label>
                        <Input 
                          id="Blood_Colesterolo_HDL"
                          placeholder="Es: 50"
                          value={values.bloodValues.Blood_Colesterolo_HDL}
                          onChange={(e) => handleInputChange('Blood_Colesterolo_HDL', e.target.value)}
                          className={`
                            ${isDangerRange('Blood_Colesterolo_HDL', values.bloodValues.Blood_Colesterolo_HDL) ? 'border-red-500 bg-red-50' : 
                              isWarningRange('Blood_Colesterolo_HDL', values.bloodValues.Blood_Colesterolo_HDL) ? 'border-yellow-500 bg-yellow-50' : ''}
                          `}
                          required
                        />
                        <p className={`text-sm mt-1 ${isWarningRange('Blood_Colesterolo_HDL', values.bloodValues.Blood_Colesterolo_HDL) ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                          Normal value: {">"} 40 mg/dL (men), {">"} 50 mg/dL (women)
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="Blood_Trigliceridi">Triglycerides (mg/dL)</Label>
                        <Input 
                          id="Blood_Trigliceridi"
                          placeholder="Es: 150"
                          value={values.bloodValues.Blood_Trigliceridi}
                          onChange={(e) => handleInputChange('Blood_Trigliceridi', e.target.value)}
                          className={`
                            ${isDangerRange('Blood_Trigliceridi', values.bloodValues.Blood_Trigliceridi) ? 'border-red-500 bg-red-50' : 
                              isWarningRange('Blood_Trigliceridi', values.bloodValues.Blood_Trigliceridi) ? 'border-yellow-500 bg-yellow-50' : ''}
                          `}
                          required
                        />
                        <p className={`text-sm mt-1 ${isWarningRange('Blood_Trigliceridi', values.bloodValues.Blood_Trigliceridi) ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                          Normal value: {"<"} 150 mg/dL
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="Blood_Glucosio">Glucose (mg/dL)</Label>
                        <Input 
                          id="Blood_Glucosio"
                          placeholder="Es: 90"
                          value={values.bloodValues.Blood_Glucosio}
                          onChange={(e) => handleInputChange('Blood_Glucosio', e.target.value)}
                          className={`
                            ${isDangerRange('Blood_Glucosio', values.bloodValues.Blood_Glucosio) ? 'border-red-500 bg-red-50' : 
                              isWarningRange('Blood_Glucosio', values.bloodValues.Blood_Glucosio) ? 'border-yellow-500 bg-yellow-50' : ''}
                          `}
                          required
                        />
                        <p className={`text-sm mt-1 ${isWarningRange('Blood_Glucosio', values.bloodValues.Blood_Glucosio) ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                          Normal value: 70 - 100 mg/dL
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="Blood_Vitamina_D">Vitamin D (ng/mL)</Label>
                        <Input 
                          id="Blood_Vitamina_D"
                          placeholder="Es: 30"
                          value={values.bloodValues.Blood_Vitamina_D}
                          onChange={(e) => handleInputChange('Blood_Vitamina_D', e.target.value)}
                          className={`
                            ${isDangerRange('Blood_Vitamina_D', values.bloodValues.Blood_Vitamina_D) ? 'border-red-500 bg-red-50' : 
                              isWarningRange('Blood_Vitamina_D', values.bloodValues.Blood_Vitamina_D) ? 'border-yellow-500 bg-yellow-50' : ''}
                          `}
                          required
                        />
                        <p className={`text-sm mt-1 ${isWarningRange('Blood_Vitamina_D', values.bloodValues.Blood_Vitamina_D) ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                          Normal value: 20 - 50 ng/mL
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="Blood_Ferro">Ferritin (ng/mL)</Label>
                        <Input 
                          id="Blood_Ferro"
                          placeholder="Es: 100"
                          value={values.bloodValues.Blood_Ferro}
                          onChange={(e) => handleInputChange('Blood_Ferro', e.target.value)}
                          className={`
                            ${isDangerRange('Blood_Ferro', values.bloodValues.Blood_Ferro) ? 'border-red-500 bg-red-50' : 
                              isWarningRange('Blood_Ferro', values.bloodValues.Blood_Ferro) ? 'border-yellow-500 bg-yellow-50' : ''}
                          `}
                          required
                        />
                        <p className={`text-sm mt-1 ${
                          isDangerRange('Blood_Ferro', values.bloodValues.Blood_Ferro) ? 'text-red-600' : 
                          isWarningRange('Blood_Ferro', values.bloodValues.Blood_Ferro) ? 'text-yellow-600' : 
                          'text-muted-foreground'
                        }`}>
                          Normal value: 81 - 176 ng/mL (men), 61 - 170 ng/mL (women)
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="Blood_Creatinina">Creatinine (mg/dL)</Label>
                        <Input 
                          id="Blood_Creatinina"
                          placeholder="Es: 1.0"
                          value={values.bloodValues.Blood_Creatinina}
                          onChange={(e) => handleInputChange('Blood_Creatinina', e.target.value)}
                          className={`
                            ${isDangerRange('Blood_Creatinina', values.bloodValues.Blood_Creatinina) ? 'border-red-500 bg-red-50' : 
                              isWarningRange('Blood_Creatinina', values.bloodValues.Blood_Creatinina) ? 'border-yellow-500 bg-yellow-50' : ''}
                          `}
                          required
                        />
                        <p className={`text-sm mt-1 ${isWarningRange('Blood_Creatinina', values.bloodValues.Blood_Creatinina) ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                          Normal value: 0.7 - 1.2 mg/dL (men), 0.6 - 1.1 mg/dL (women)
                        </p>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white border-none transition-all duration-300 transform hover:scale-[1.02] py-6 text-lg font-medium shadow-lg hover:shadow-xl rounded-xl" 
                      disabled={loading}
                    >
                      <div className="flex items-center justify-center gap-3" role="presentation">
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" role="presentation"></div>
                            <span>Analysis in progress...</span>
                          </>
                        ) : (
                          <>
                            <Apple className="w-5 h-5" />
                            <span>Get Personalized Recommendations</span>
                          </>
                        )}
                      </div>
                    </Button>

                    {hasWarningValues() && (
                      <div className="mt-6 p-4 bg-yellow-50/80 backdrop-blur border border-yellow-200 rounded-xl shadow-inner">
                        <p className="text-sm text-yellow-700 flex items-center gap-2">
                          <span className="p-1 bg-yellow-100 rounded-full">
                            <Droplet className="w-4 h-4 text-yellow-600" />
                          </span>
                          <span>
                            <span className="font-semibold">Warning:</span> Fields highlighted in yellow indicate values that are in a warning range. 
                            These values, while not necessarily pathological, may require closer monitoring.
                          </span>
                        </p>
                      </div>
                    )}

                    {hasDangerValues() && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-700">
                          <span className="font-medium">Warning:</span> Fields highlighted in red indicate potentially critical values. 
                          It is recommended to consult a doctor before proceeding with the analysis.
                        </p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </div>
            </Card>

            {showResults && recommendations.length > 0 && (
              <div className="mt-8 animate-fadeIn">
                <AnalysisResults recommendations={recommendations} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

