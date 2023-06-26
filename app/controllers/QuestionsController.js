import { AppState } from "../AppState.js";
import { questionsService } from "../services/QuestionsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";

function _drawQuestion() {
  const chosenQuestion = AppState.activeQuestion

  // @ts-ignore
  if (chosenQuestion.type == 'multiple') {
    // @ts-ignore
    setHTML('question', chosenQuestion.mutlipleChoiceTemplate)
  } else {
    // @ts-ignore
    setHTML('question', chosenQuestion.booleanTemplate)
  }

}
function _drawScore() {
  setText('score', AppState.playerScore)
}

export class QuestionsController {
  constructor() {
    console.log('controller test');
    this.getQuestions()

    AppState.on('activeQuestion', _drawQuestion)
    AppState.on('playerScore', _drawScore)
  }



  async getQuestions() {

    try {
      await questionsService.getQuestions()

    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }

  }

  selectRandomQuestion() {

    questionsService.selectRandomQuestion()

  }

  selectAnswer(answer) {

    questionsService.selectAnswer(answer)


  }

  chooseCategory(event) {
    event.preventDefault()

    const form = event.target
    const formData = getFormData(form)

    questionsService.chooseCategory(formData)
  }




}