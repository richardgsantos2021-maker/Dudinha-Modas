// Espera o HTML carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO CATÁLOGO DE PRODUTOS ---

    // 1. Aponta para os elementos (IDs) que estão no HTML
    const catalogGrid = document.getElementById('catalog-grid');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const loadingMessage = document.getElementById('loading-message');

    // 2. É AQUI QUE VOCÊ CADASTRA SEUS PRODUTOS (IMAGENS, NOMES, PREÇOS)
    // 
    const initialData = [
        { 
            nome: 'Blazer Clássico', 
            categoria: 'Blazer', 
            cor: 'Bege', 
            preco: 299.90, 
            img: '/img/blazer.jpg' // <-- Imagem do produto 1
        },
        { 
            nome: 'Calça Wide Leg', 
            categoria: 'Calça', 
            cor: 'Azul Marinho', 
            preco: 159.90, 
            img: '/img/calça.jpg' // <-- Imagem do produto 2
        },
        { 
            nome: 'Cardigan Leve', 
            categoria: 'Cardigan', 
            cor: 'Cinza', 
            preco: 229.90, 
            img: '/img/cardig.jpg' // <-- Imagem do produto 3
        },
        { 
            nome: 'Look Coleção Outono', 
            categoria: 'Look', 
            cor: 'Bege', 
            preco: 549.90, 
            img: '/img/botacamisabranca.jpg' // <-- Imagem do produto 4
        },
        { 
            nome: 'Look Terno Primavera', 
            categoria: 'Look', 
            cor: 'Bege', 
            preco: 699.90, 
            img: '/img/mulher.jpg' // <-- Imagem do produto 5
        },
        { 
            nome: 'Blazer com Blusa Preta', 
            categoria: 'Blazer', 
            cor: 'Bege', 
            preco: 299.90, 
            img: '/img/mulherpreto.jpg' // <-- Imagem do produto 6
        },
        { 
            nome: 'Look Total Black', 
            categoria: 'Look', 
            cor: 'Preto', 
            preco: 319.80, 
            img: '/img/mulherfullpreto.jpg' // <-- Imagem do produto 7
        },
        { 
            nome: 'Cardigan Botões', 
            categoria: 'Cardigan', 
            cor: 'Cinza', 
            preco: 289.90, 
            img: '/img/mulhergemini.jpg' // <-- Imagem do produto 8
        }
        // Para adicionar um novo produto, copie e cole um bloco {} acima
    ];

    // Guarda os dados que estão sendo mostrados
    let currentData = [...initialData];

    // 3. Função para "desenhar" os produtos na tela
    const renderGrid = (data) => {
        catalogGrid.innerHTML = ''; // Limpa o grid
        if (loadingMessage) {
            loadingMessage.style.display = 'none'; // Esconde "Carregando..."
        }
        if (data.length === 0) {
            catalogGrid.innerHTML = '<p class="text-center" style="grid-column: 1 / -1; color: #777;">Nenhum produto encontrado.</p>';
            return;
        }
        data.forEach(item => {
            const formattedPrice = item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const productCard = document.createElement('div');
            productCard.className = 'product-item'; 
            
            // ESTE É O HTML QUE O JS CRIA PARA CADA PRODUTO:
            productCard.innerHTML = `
                <img src="${item.img}" alt="${item.nome}">
                <div class="product-info">
                    <h3>${item.nome}</h3>
                    <p class="price">${formattedPrice}</p>
                </div>
            `;
            catalogGrid.appendChild(productCard);
        });
    };

    // 4. Função para FILTRAR os dados (Barra de Pesquisa)
    const filterData = () => {
        const searchTerm = searchInput.value.toLowerCase();
        currentData = initialData.filter(item => {
            return item.nome.toLowerCase().includes(searchTerm) ||
                   item.cor.toLowerCase().includes(searchTerm) ||
                   item.categoria.toLowerCase().includes(searchTerm) ||
                   item.preco.toString().includes(searchTerm);
        });
        sortData(); 
    };

    // 5. Função para ORDENAR os dados (A-Z, Preço)
    const sortData = () => {
        const [column, direction] = sortSelect.value.split('_');
        if (!column) { 
            renderGrid(currentData); 
            return;
        }
        currentData.sort((a, b) => {
            let comparison = 0;
            if (column === 'nome') {
                comparison = a.nome.localeCompare(b.nome); 
            } else if (column === 'preco') {
                comparison = a[column] - b[column]; 
            }
            return direction === 'desc' ? comparison * -1 : comparison;
        });
        renderGrid(currentData); 
    };

    // 6. "Escutadores" de Eventos
    searchInput.addEventListener('input', filterData);
    sortSelect.addEventListener('change', sortData);

    // 7. Renderização inicial
    renderGrid(initialData);

});