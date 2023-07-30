import { loadStripe } from "@stripe/stripe-js";

let stripePromise :any;
let key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const getStripe = () => {
    if(!stripePromise){
        stripePromise = loadStripe(key as string);
    }
    return stripePromise;
} 

export default getStripe;