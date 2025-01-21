"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

export default function DietRecommendations() {
  // Stato per gestire le sezioni aperte
  const [openSections, setOpenSections] = useState<string[]>([])

  return (
    <Tabs defaultValue="anemia" className="w-full">
      <ScrollArea className="w-full">
        <TabsList className="flex w-full h-12">
          <TabsTrigger value="anemia">Anemia</TabsTrigger>
          <TabsTrigger value="hypercholesterolemia">Hypercholesterolemia</TabsTrigger>
          <TabsTrigger value="hypertriglyceridemia">Hypertriglyceridemia</TabsTrigger>
          <TabsTrigger value="hyperglycemia">Hyperglycemia</TabsTrigger>
          <TabsTrigger value="hyperuricemia">Hyperuricemia</TabsTrigger>
          <TabsTrigger value="hypertransaminasemia">Hypertransaminasemia</TabsTrigger>
        </TabsList>
      </ScrollArea>

      <TabsContent value="anemia">
        <Card>
          <CardHeader>
            <CardTitle>Diet for Anemia</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion 
              type="multiple" 
              value={openSections}
              onValueChange={setOpenSections}
              className="w-full"
            >
              <AccordionItem value="meats">
                <AccordionTrigger className="text-lg font-medium">Meats</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-red-50/50 rounded-lg">Horse</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Beef</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Veal</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Guinea fowl</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Lamb</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Turkey</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Rabbit</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Pork</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Chicken</div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Special recommendations:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Calf or pork liver (once a week)</li>
                      <li>Bresaola, speck, cooked or raw ham</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fish">
                <AccordionTrigger className="text-lg font-medium">Fish</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-blue-50/50 rounded-lg">Snapper</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Dogfish</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Trout</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Mullet</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Octopus</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Tuna</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Sole</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Mussels</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Mackerel</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Pandora fish</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="vegetable">
                <AccordionTrigger className="text-lg font-medium">Vegetable Sources</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">Legumes (soy, lentils)</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Chickpeas, peas</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Beans</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Radicchio</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Arugula</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Spinach</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Dried fruits</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Walnuts</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Hazelnuts</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="absorption">
                <AccordionTrigger className="text-lg font-medium">Absorption Tips</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">Consume foods rich in Vitamin C in the same meal, such as:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Kiwi</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Oranges</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Lemon juice</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Tangerines</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Clementines</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Strawberries</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Peppers</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="hypercholesterolemia">
        <Card>
          <CardHeader>
            <CardTitle>Diet for Hypercholesterolemia</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion 
              type="multiple" 
              value={openSections}
              onValueChange={setOpenSections}
              className="w-full"
            >
              <AccordionItem value="recommended">
                <AccordionTrigger className="text-lg font-medium">Recommended Foods</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">Skim milk</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Low-fat yogurt</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Lean meats</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Fresh fish</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Olive oil</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Whole grain bread</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Legumes</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Seasonal fruits</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Vegetables</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="avoid">
                <AccordionTrigger className="text-lg font-medium">Foods to Avoid</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-red-50/50 rounded-lg">Whole milk</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Aged cheeses</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Fatty meats</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Offal</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Game meat</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Butter</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Sweets</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Alcohol</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tips">
                <AccordionTrigger className="text-lg font-medium">Cooking Tips</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50/50 rounded-lg">Prefer grilling</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Use steaming</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Try baking</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Avoid frying</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Avoid sautéing</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="hypertriglyceridemia">
        <Card>
          <CardHeader>
            <CardTitle>Diet for Hypertriglyceridemia</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion 
              type="multiple" 
              value={openSections}
              onValueChange={setOpenSections}
              className="w-full"
            >
              <AccordionItem value="recommended">
                <AccordionTrigger className="text-lg font-medium">Recommended Foods</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">Skim milk</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Low-fat yogurt</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Lean meats</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Poultry cold cuts</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Fresh fish</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Extra virgin olive oil</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Whole grain bread</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Legumes</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Seasonal fruits</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Fresh vegetables</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="avoid">
                <AccordionTrigger className="text-lg font-medium">Foods to Avoid</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-red-50/50 rounded-lg">Whole milk</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Cream</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Mascarpone</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Aged cheeses</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Fatty meats</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Cured meats</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Sweets</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Sugary drinks</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="hyperglycemia">
        <Card>
          <CardHeader>
            <CardTitle>Diet for Hyperglycemia</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion 
              type="multiple" 
              value={openSections}
              onValueChange={setOpenSections}
              className="w-full"
            >
              <AccordionItem value="reference">
                <AccordionTrigger className="text-lg font-medium">Reference Values</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-blue-50/50 rounded-lg">Normal: 60-100 mg/dL</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Borderline: 100-125 mg/dL</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Hyperglycemia: ≥126 mg/dL</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recommended">
                <AccordionTrigger className="text-lg font-medium">Recommended Foods</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">Skimmed milk</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Low-fat yogurt</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Lean meats</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Fresh fish</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Olive oil</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Whole grains</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Legumes</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Fresh vegetables</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Limited fruits</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="avoid">
                <AccordionTrigger className="text-lg font-medium">Foods to Avoid</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-red-50/50 rounded-lg">Whole milk</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Cream</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Aged cheeses</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Fatty meats</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Offal</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Game meat</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Shellfish</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Butter</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">White bread</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Sugary drinks</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Alcohol</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tips">
                <AccordionTrigger className="text-lg font-medium">Important Tips</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50/50 rounded-lg">Avoid sugary drinks</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">No added sugar in beverages</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Max 3 fruit portions daily (150g each)</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Prefer whole grain products</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="hyperuricemia">
        <Card>
          <CardHeader>
            <CardTitle>Diet for Hyperuricemia</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion 
              type="multiple" 
              value={openSections}
              onValueChange={setOpenSections}
              className="w-full"
            >
              <AccordionItem value="info">
                <AccordionTrigger className="text-lg font-medium">What is Hyperuricemia?</AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 bg-blue-50/50 rounded-lg">
                    Uricemia measures the level of uric acid in the blood. Uric acid can accumulate and deposit in the joints, causing gout.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recommended">
                <AccordionTrigger className="text-lg font-medium">Recommended Foods</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">Milk and yogurt</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Non-whole grains</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Eggs</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Fresh vegetables</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Ripe fruits</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Light jam</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Honey</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Water</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Fruit juices</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Olive oil</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="moderate">
                <AccordionTrigger className="text-lg font-medium">Foods in Moderation</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Eel</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Mollusks</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Legumes</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Wheat bran</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Red meat</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Poultry</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Fresh cheese</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Mushrooms</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Spinach</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Asparagus</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="avoid">
                <AccordionTrigger className="text-lg font-medium">Foods to Avoid</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-red-50/50 rounded-lg">Anchovies</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Sardines</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Offal</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Game meat</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Fried foods</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Lard</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Dried fruits</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Tea</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Coffee</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Alcohol</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Cocoa</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tips">
                <AccordionTrigger className="text-lg font-medium">Key Recommendations</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50/50 rounded-lg">Maintain healthy body weight</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Drink plenty of water</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="hypertransaminasemia">
        <Card>
          <CardHeader>
            <CardTitle>Diet for Hypertransaminasemia</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion 
              type="multiple" 
              value={openSections}
              onValueChange={setOpenSections}
              className="w-full"
            >
              <AccordionItem value="info">
                <AccordionTrigger className="text-lg font-medium">About Hypertransaminasemia</AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 bg-blue-50/50 rounded-lg">
                    Altered transaminase levels (ALT, AST) require careful dietary management. Here are practical tips to improve your diet.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="avoid">
                <AccordionTrigger className="text-lg font-medium">Foods and Habits to Avoid</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-red-50/50 rounded-lg">Alcoholic beverages</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Elaborate dishes</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Fried foods</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Animal fats</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Preserved vegetables</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Cured meats</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">Mayonnaise-based sauces</div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="recommended">
                <AccordionTrigger className="text-lg font-medium">Recommended Choices</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">Lean meats</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Low-fat dairy</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Fresh vegetables</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Light cheeses</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Occasional lean cold cuts</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
  )
}

