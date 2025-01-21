"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

export default function BloodValuesInfo() {
  const [openSection, setOpenSection] = useState<string | undefined>(undefined)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Values Reference Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion 
          type="single" 
          value={openSection}
          onValueChange={setOpenSection}
          className="w-full"
          collapsible
        >
          <AccordionItem value="cholesterol">
            <AccordionTrigger className="text-lg font-medium">Cholesterol</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Cholesterol is an essential fat for the body but can be harmful in excess.</p>
                
                <div>
                  <h4 className="font-semibold mb-2">Total Cholesterol values:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">{"<"} 200 mg/dL: Ideal</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">120-199 mg/dL: Low range</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">200-239 mg/dL: High range</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">{"<"} 120 mg/dL: Extremely low</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">{">"}240 mg/dL: Extremely high</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">HDL Cholesterol:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">Men: {">"}40 mg/dL ideal</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Women: {">"}50 mg/dL ideal</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">60-80 mg/dL: High (but not harmful)</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">{">"}80 mg/dL: Very high (rarely problematic)</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="triglycerides">
            <AccordionTrigger className="text-lg font-medium">Triglycerides</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Triglycerides are lipids present in the blood.</p>

                <div>
                  <h4 className="font-semibold mb-2">Values:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">{"<"} 150 mg/dL: Ideal</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">40-149 mg/dL: Normal range</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">150-199 mg/dL: High range</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">{"<"} 40 mg/dL: Extremely low</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">{">"}200 mg/dL: Extremely high</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Diet Influence:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="p-2 bg-blue-50/50 rounded-lg">Limit simple sugars</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Reduce alcohol consumption</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Increase fiber intake</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Prefer healthy fats</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Consume omega-3 rich fish</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="glucose">
            <AccordionTrigger className="text-lg font-medium">Fasting Glucose</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Blood glucose represents the concentration of sugar in the blood.</p>

                <div>
                  <h4 className="font-semibold mb-2">Values:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">70-100 mg/dL: Normal</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">60-69 mg/dL: Low range</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">100-125 mg/dL: High range</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">{"<"} 60 mg/dL: Extremely low</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">≥ 126 mg/dL: Extremely high</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Diet Influence:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="p-2 bg-blue-50/50 rounded-lg">Avoid sugary drinks</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Avoid sugar in beverages</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Limit fruit portions</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Prefer whole grain products</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Regular vegetable intake</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="vitamin-d">
            <AccordionTrigger className="text-lg font-medium">Vitamin D</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Vitamin D is essential for bone health and immune system function.</p>

                <div>
                  <h4 className="font-semibold mb-2">Values:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">30-50 ng/mL: Normal</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">10-19 ng/mL: Deficiency</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">50-70 ng/mL: High</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">{"<"} 10 ng/mL: Severe deficiency</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">{">"}100 ng/mL: Toxicity</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="iron">
            <AccordionTrigger className="text-lg font-medium">Serum Iron</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Iron is essential for hemoglobin production and oxygen transport.</p>

                <div>
                  <h4 className="font-semibold mb-2">Values:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">60-170 µg/dL: Normal</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">40-59 µg/dL: Low range</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">170-200 µg/dL: High range</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">{"<"} 40 µg/dL: Extremely low</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">{">"}200 µg/dL: Extremely high</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Diet Influence:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="p-2 bg-blue-50/50 rounded-lg">Consume lean red meats</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Eat legumes and greens</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Pair with vitamin C foods</div>
                    <div className="p-2 bg-blue-50/50 rounded-lg">Avoid tea/coffee with meals</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="creatinine">
            <AccordionTrigger className="text-lg font-medium">Creatinine</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Creatinine is a waste product filtered by the kidneys.</p>

                <div>
                  <h4 className="font-semibold mb-2">Values:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-2 bg-green-50/50 rounded-lg">Men: 0.7-1.2 mg/dL: Normal</div>
                    <div className="p-2 bg-green-50/50 rounded-lg">Women: 0.6-1.1 mg/dL: Normal</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">0.4-0.6 mg/dL: Low range</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Men: 1.3-1.9 mg/dL: High range</div>
                    <div className="p-2 bg-yellow-50/50 rounded-lg">Women: 1.2-1.9 mg/dL: High range</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">{"<"} 0.4 mg/dL: Extremely low</div>
                    <div className="p-2 bg-red-50/50 rounded-lg">≥ 2.0 mg/dL: Extremely high</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

