function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        searchInput.focus();
    }
}

function performSearch() {
    const query = document.getElementById('searchInput').value;
    console.log(`Searching for: ${query}`);
    alert(`Searching for: ${query}`);

    const searchBar = document.getElementById('searchBar');
    searchBar.style.animation = 'shake 0.5s';
    setTimeout(() => {
        searchBar.style.animation = '';
    }, 500);
}

const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0% { transform: translateX(-50%) translateY(0); }
        25% { transform: translateX(-50%) translateY(-5px); }
        50% { transform: translateX(-50%) translateY(5px); }
        75% { transform: translateX(-50%) translateY(-5px); }
        100% { transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(style);