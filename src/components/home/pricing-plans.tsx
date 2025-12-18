import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, Star, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const plans = [
  {
    name: 'Starter Plan',
    price: 'Free',
    pricePeriod: '',
    description: 'Get started with our AI financial planner and basic tools.',
    features: [
      'AI-Powered Financial Plan',
      'Savings Goal Calculator',
      'Community Forum Access',
    ],
    isPopular: false,
    isPromo: false,
  },
  {
    name: 'Pro Student',
    price: 'Free',
    originalPrice: '₹499',
    pricePeriod: 'for 1st Year UG Students',
    description: 'Unlock one-on-one consultancy and advanced planning with this special offer for your first year.',
    features: [
      'Everything in Starter',
      '1-on-1 Session with an Advisor',
      'Personalized Budget Review',
      'Investment Guidance for Beginners',
    ],
    isPopular: true,
    isPromo: true,
  },
  {
    name: 'Graduate Plan',
    price: '₹999',
    pricePeriod: '/three months',
    description: 'Comprehensive planning for post-graduation life.',
    features: [
      'Everything in Pro Student',
      'Career-focused Financial Strategy',
      'Loan Repayment Planning',
      'Long-term Investment Plan',
    ],
    isPopular: false,
    isPromo: false,
  },
];

export function PricingPlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <Card key={plan.name} className={`flex flex-col shadow-lg ${plan.isPopular ? 'border-primary border-2' : ''}`}>
          <div className="relative">
            {plan.isPopular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Star className="mr-2 h-4 w-4" />
                Most Popular
              </Badge>
            )}
             {plan.isPromo && (
              <Badge variant="secondary" className="absolute -top-3 right-0 -translate-x-1/4 bg-green-100 text-green-800 border-green-300">
                <Sparkles className="mr-2 h-4 w-4 text-green-600" />
                1 Year Free Offer!
              </Badge>
            )}
          </div>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.originalPrice && <span className="text-lg font-normal text-muted-foreground line-through">{plan.originalPrice}</span>}
            </div>
             {plan.pricePeriod && <span className="text-sm font-normal text-muted-foreground">{plan.pricePeriod}</span>}
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>
              Get Started
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
