import { AppState } from "../AppState.js"
import { Question } from "../models/Question.js"
import { Pop } from "../utils/Pop.js"
import { questionsApi } from "./AxiosService.js"



class QuestionsService {
  chooseCategory(formData) {

    AppState.category = '&category=' + formData
  }

  selectAnswer(answer) {
    // @ts-ignore
    if (answer == AppState.activeQuestion.correctAnswer) {
      AppState.playerScore++
      Pop.success('You got it right!')
    } else {
      Pop.error('That is incorrect!')
    }
    this.selectRandomQuestion()
  }
  selectRandomQuestion() {
    AppState.activeQuestion = AppState.questions[Math.floor(Math.random() * AppState.questions.length)]


  }
  async getQuestions() {

    const response = await questionsApi.get(AppState.category)
    console.log(response)

    const arrayOfQuestions = response.data.results.map(q => new Question(q))

    AppState.questions = arrayOfQuestions
    console.log(AppState.questions);
  }

}



export const questionsService = new QuestionsService