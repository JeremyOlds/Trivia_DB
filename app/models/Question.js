

export class Question {
  constructor(data) {
    this.category = data.category
    this.correctAnswer = data.correct_answer
    this.incorrectAnswers = data.incorrect_answers
    this.question = data.question
    this.type = data.type
  }

  get mutlipleChoiceTemplate() {
    return /*html*/`
    <div class="col-12 d-flex justify-content-center">
    <h2>${this.question}</h2>
  </div>

  <div class="row justify-content-around px-5 text-light">
   ${this.ComputeRandomAnswers}
  </div>
  
  `
  }

  get booleanTemplate() {
    return /*html*/`
    <div class="col-12 d-flex justify-content-center">
    <h2>${this.question}</h2>
  </div>

  <div class="row justify-content-around px-5 text-light">
    <div onclick="app.QuestionsController.selectAnswer('True')" class="col-4 py-4 selectable bg-dark text-center mt-2">
      <h3>True</h3>
    </div>
    <div onclick="app.QuestionsController.selectAnswer('False')" class="col-4 py-4 selectable bg-dark text-center mt-2">
      <h3>False</h3>
    </div>
  </div>

    `
  }

  get ComputeRandomAnswers() {
    let answers = [...this.incorrectAnswers]
    let randomIndex = Math.round(Math.random() * answers.length)
    answers.splice(randomIndex, 0, this.correctAnswer)


    let template = ''

    answers.forEach(a => template += `
    <div onclick="app.QuestionsController.selectAnswer('${a}')" class="col-6 py-4 selectable bg-dark text-center mt-2">
      <h3>${a}</h3>
    </div>
    `)
    return template
  }



}