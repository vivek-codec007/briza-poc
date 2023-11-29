import AirBriza from "views/QuestionsRender/AirBriza";
import ApplicationQuestions from "views/QuestionsRender/ApplicationQuestions";
import CreateQuote from "views/CreateQuote";
import QuoteList from "views/QuoteList";

export const PreApp = {
    component: AirBriza,
    path: '/',
}

export const Application = {
    component: ApplicationQuestions,
    path: '/create-app',
}

export const QuoteCreate = {
    component: CreateQuote,
    path: '/create-quote',
}

export const GetQuoteList = {
    component: QuoteList,
    path: '/quotes',
}

const routes = [
    PreApp,
    Application,
    QuoteCreate,
    GetQuoteList
]

export default routes;