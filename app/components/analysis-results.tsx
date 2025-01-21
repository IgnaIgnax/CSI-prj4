import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, CheckCircle2, XCircle, Coffee } from 'lucide-react'

export interface FoodRecommendation {
  food: string;
  score: number;
  code: string;
  recommendation: string;
  impact_good: number;
  impact_bad: number;
}

interface AnalysisResultsProps {
  recommendations: FoodRecommendation[]
}

export function AnalysisResults({ recommendations }: AnalysisResultsProps) {
  const recommendedFoods = recommendations.filter(r => r.recommendation === "To be recommended")
  const avoidFoods = recommendations.filter(r => r.recommendation === "Not recommended")
  const moderateFoods = recommendations.filter(r => r.recommendation === "Take in moderation")

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              To be recommended
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <ul className="space-y-2">
                {recommendedFoods.map((food, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {food.food}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-yellow-500" />
              Take in moderation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <ul className="space-y-2">
                {moderateFoods.map((food, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    {food.food}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Not recommended
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <ul className="space-y-2">
                {avoidFoods.map((food, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    {food.food}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

