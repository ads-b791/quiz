const questions = [
	//{
	//	question: "Какой язык работает в браузере?",
	//	answers: ["Java", "C", "Python", "JavaScript"],
	//	correct: 4,
	//},
	//{
	//	question: "Что означает CSS?",
	//	answers: [
	//		"Central Style Sheets",
	//		"Cascading Style Sheets",
	//		"Cascading Simple Sheets",
	//		"Cars SUVs Sailboats",
	//	],
	//	correct: 2,
	//},
	//{
	//	question: "Что означает HTML?",
	//	answers: [
	//		"Hypertext Markup Language",
	//		"Hypertext Markdown Language",
	//		"Hyperloop Machine Language",
	//		"Helicopters Terminals Motorboats Lamborginis",
	//	],
	//	correct: 1,
	//},
	//{
	//	question: "В каком году был создан JavaScript?",
	//	answers: ["1996", "1995", "1994", "все ответы неверные"],
	//	correct: 2,
	//},
	{
		question: "Какое стихийное бедствие измеряется по шкале Рихтера?",
		answers: ["Торнадо", "Землетрясения", "Наводнения", "Ураган"],
		correct: 2,
	},
	{
		question: "Какая планета находится ближе всего к Солнцу?",
		answers: ["Земля", "Марс", "Меркурий", "Венера"],
		correct: 3,
	},
	{
		question: "Из какого вещества состоят ногти?",
		answers: ["Серотонин", "Эпидермис", "Меланин", "Кератин"],
		correct: 4,
	},
	{
		question: "Что означает термин ДНК?",
		answers: [
			"Дезоксирибонуклеарная кислота",
			"Дуорибонуклеиновая кислота",
			"Дуоксирибонуклеиновая кислота",
			"Дезоксирибонуклеиновая кислота",
		],
		correct: 4,
	},
	{
		question: "Кто был первым человеком, увидевшим луны Юпитера?",
		answers: [
			"Галилео Галилей",
			"Альберт Эйнштейн",
			"Исаак Ньютон",
			"Николай Коперник",
		],
		correct: 1,
	},
	{
		question: "Кто была первой женщиной, получившей Нобелевскую премию в 1903 году?",
		answers: [
			"Перл Бак",
			"Розалинд Франклин",
			"Мария Кюри",
			"Джейн Аддамс",
		],
		correct: 3,
	},
	{
		question: "“K” - это химический символ какого элемента?",
		answers: [
			"Хром",
			"Титан",
			"Водород",
			"Калий",
		],
		correct: 4,
	},
	{
		question: "Кто был первым человеком, побывавшим на Луне?",
		answers: [
			"Джеймс Б. Ирвин",
			"Пит Конрад",
			"Алан Шепард",
			"Нил Армстронг",
		],
		correct: 4,
	},
	{
		question: "Как называются животные, которые питаются только растениями?",
		answers: [
			"Плотоядные",
			"Травоядные",
			"Всеядные",
			"Вегетарианец",
		],
		correct: 2,
	},
	{
		question: "Что это за животное - косатка?",
		answers: [
			"Тюлень",
			"Осьминог",
			"Акула",
			"Кит",
		],
		correct: 4,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;
	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']) {
		const questionTemplate =
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

		//let answerHTML = questionTemplate.replace('%answer%', answerText);
		//answerHTML = answerHTML.replace('%number%', answerNumber);

		const answerHTML = questionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', answerNumber);

		listContainer.innerHTML += answerHTML;

		answerNumber++;
	}
}

function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	if (!checkedRadio) {
		submitBtn.blur();
		return
	}
	const userAnswer = parseInt(checkedRadio.value);

	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {

	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
		`;

	let title, message;

	if (score === questions.length) {
		title = 'Поздравляем! 🏆'
		message = 'Вы ответили верно на все вопросы! 😎💪'
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат! 😉'
		message = 'Вы дали более половины правильных ответов! 👌'
	} else {
		title = 'Стоит постараться! 😐'
		message = 'Пока у Вас меньше половины правильных ответов!'
	}

	let result = `${score} из ${questions.length}`;

	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = function () {
		history.go()
	};
}