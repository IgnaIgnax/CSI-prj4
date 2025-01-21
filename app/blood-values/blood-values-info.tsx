import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function BloodValuesInfo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="cholesterol">
        <AccordionTrigger>Cholesterol</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Cholesterol is an essential fat for the body but can be harmful in excess.</p>
            <h4 className="font-semibold">Total Cholesterol values:</h4>
            <ul className="list-disc pl-6">
              <li>{"<"} 200 mg/dL: Ideal</li>
              <li>120-199 mg/dL: Low range (may indicate malnutrition or other conditions)</li>
              <li>200-239 mg/dL: High range</li>
              <li>{"<"} 120 mg/dL: Extremely low</li>
              <li>{">"}240 mg/dL: Extremely high</li>
            </ul>
            <h4 className="font-semibold">HDL Cholesterol:</h4>
            <ul className="list-disc pl-6">
              <li>Men: {">"}40 mg/dL ideal, {"<"}35 mg/dL extremely low</li>
              <li>Women: {">"}50 mg/dL ideal, {"<"}40 mg/dL extremely low</li>
              <li>60-80 mg/dL: High (but not harmful)</li>
              <li>{">"}80 mg/dL: Very high (rarely problematic)</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="triglycerides">
        <AccordionTrigger>Triglycerides</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Triglycerides are lipids present in the blood.</p>
            <h4 className="font-semibold">Values:</h4>
            <ul className="list-disc pl-6">
              <li>{"<"} 150 mg/dL: Ideal</li>
              <li>40-149 mg/dL: Normal range</li>
              <li>150-199 mg/dL: High range</li>
              <li>{"<"} 40 mg/dL: Extremely low</li>
              <li>{">"}200 mg/dL: Extremely high (increased risk of pancreatitis)</li>
            </ul>
            <h4 className="font-semibold mt-4">Diet Influence:</h4>
            <p>To maintain healthy triglyceride levels:</p>
            <ul className="list-disc pl-6">
              <li>Limit simple sugars and refined carbohydrates</li>
              <li>Reduce alcohol consumption</li>
              <li>Increase fiber intake</li>
              <li>Prefer healthy fats such as olive oil</li>
              <li>Consume omega-3 rich fish</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="glucose">
        <AccordionTrigger>Fasting Glucose</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Blood glucose represents the concentration of sugar in the blood.</p>
            <h4 className="font-semibold">Values:</h4>
            <ul className="list-disc pl-6">
              <li>70-100 mg/dL: Normal</li>
              <li>60-69 mg/dL: Low range</li>
              <li>100-125 mg/dL: High range (prediabetes)</li>
              <li>{"<"} 60 mg/dL: Extremely low (severe hypoglycemia)</li>
              <li>≥ 126 mg/dL: Extremely high (diabetes)</li>
            </ul>
            <h4 className="font-semibold mt-4">Diet Influence:</h4>
            <ul className="list-disc pl-6">
              <li>Avoid sugary drinks</li>
              <li>Avoid sugar in coffee/beverages</li>
              <li>Limit fruit portions to a maximum of 3 per day</li>
              <li>Prefer whole grain pasta and bread</li>
              <li>Regularly consume vegetables</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="vitamin-d">
        <AccordionTrigger>Vitamin D</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Vitamin D is essential for bone health and immune system function.</p>
            <h4 className="font-semibold">Values:</h4>
            <ul className="list-disc pl-6">
              <li>30-50 ng/mL: Normal</li>
              <li>10-19 ng/mL: Deficiency</li>
              <li>50-70 ng/mL: High (but not problematic)</li>
              <li>{"<"} 10 ng/mL: Severe deficiency</li>
              <li>{">"}100 ng/mL: Toxicity</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="iron">
        <AccordionTrigger>Serum Iron</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Iron is essential for hemoglobin production and oxygen transport.</p>
            <h4 className="font-semibold">Values:</h4>
            <ul className="list-disc pl-6">
              <li>60-170 µg/dL: Normal</li>
              <li>40-59 µg/dL: Low range</li>
              <li>170-200 µg/dL: High range</li>
              <li>{"<"} 40 µg/dL: Extremely low</li>
              <li>{">"}200 µg/dL: Extremely high (severe overload)</li>
            </ul>
            <h4 className="font-semibold mt-4">Diet Influence:</h4>
            <ul className="list-disc pl-6">
              <li>Consume lean red meats</li>
              <li>Eat legumes and leafy green vegetables</li>
              <li>Pair with vitamin C-rich foods to enhance absorption</li>
              <li>Avoid tea or coffee during main meals</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="creatinine">
        <AccordionTrigger>Creatinine</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Creatinine is a waste product filtered by the kidneys.</p>
            <h4 className="font-semibold">Values:</h4>
            <ul className="list-disc pl-6">
              <li>Men: 0.7-1.2 mg/dL: Normal</li>
              <li>Women: 0.6-1.1 mg/dL: Normal</li>
              <li>0.4-0.6 mg/dL: Low range (muscle hypotrophy or malnutrition)</li>
              <li>Men: 1.3-1.9 mg/dL: High range</li>
              <li>Women: 1.2-1.9 mg/dL: High range</li>
              <li>{"<"} 0.4 mg/dL: Extremely low (very rare)</li>
              <li>≥ 2.0 mg/dL: Extremely high (established renal failure)</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

