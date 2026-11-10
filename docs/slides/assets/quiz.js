// Interactive quiz widget for slides.
// Any <div class="quiz"> with .quiz-option buttons gets click-to-check.

document.addEventListener('mkdocs-revealjs-ready', function (event) {
  const { deck, root } = event.detail;

  function initQuiz(quiz) {
    if (quiz.dataset.initialized === 'true') return;
    quiz.dataset.initialized = 'true';

    const feedback = quiz.querySelector('.quiz-feedback');
    const options = quiz.querySelectorAll('.quiz-option');

    options.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const correct = btn.dataset.answer === 'correct';

        options.forEach(function (b) {
          b.classList.remove('quiz-correct', 'quiz-wrong');
        });

        btn.classList.add(correct ? 'quiz-correct' : 'quiz-wrong');

        if (!correct) {
          options.forEach(function (b) {
            if (b.dataset.answer === 'correct') {
              b.classList.add('quiz-correct');
            }
          });
        }

        feedback.textContent = correct
          ? '✓ Correct.'
          : '✗ Not quite — the correct answer is highlighted.';
        feedback.className = 'quiz-feedback ' +
          (correct ? 'quiz-correct-text' : 'quiz-wrong-text');
      });
    });
  }

  root.querySelectorAll('.quiz').forEach(initQuiz);
  deck.on('slidechanged', function () {
    root.querySelectorAll('.quiz').forEach(initQuiz);
  });
});