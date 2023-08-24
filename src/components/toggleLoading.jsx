export default function toggleLoading () {
    const loadingElement = document.querySelector('#loading');
    loadingElement.classList.toggle('hidden'); // Adicione ou remova a classe 'hidden'
}