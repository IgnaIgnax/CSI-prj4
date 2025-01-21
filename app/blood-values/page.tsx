import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import BloodValuesInfo from "./blood-values-info"
import DietRecommendations from "./diet-recommendations"

export default function BloodValuesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-center gap-4 mb-6 relative">
        <div className="absolute left-0">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
          Blood Values and Nutrition
        </h1>
      </div>
      
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">Blood Biomarkers Information</TabsTrigger>
          <TabsTrigger value="diets">Recommended Diets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Blood Biomarkers</CardTitle>
              <CardDescription>
                Information about key blood biomarkers and how they are influenced by nutrition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BloodValuesInfo />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diets">
          <Card>
            <CardHeader>
              <CardTitle>Recommended AVIS Diets</CardTitle>
              <CardDescription>
                Dietary recommendations for specific conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DietRecommendations />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
        <Image 
          src="/avis-logo.png" 
          alt="AVIS Logo" 
          width={30} 
          height={30}
        />
        <p>
          The dietary recommendations provided in this section are furnished by AVIS (Italian Blood Volunteers Association)
        </p>
      </div>
    </div>
  )
}
