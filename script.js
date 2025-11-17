// Adiciona um listener para garantir que o DOM está carregado
document.addEventListener('DOMContentLoaded', function() {

    // --- SCRIPT DOS GRÁFICOS ---
    //
    const ctxPizza = document.getElementById('graficoPizza');
    const ctxBarras = document.getElementById('graficoBarras');
    const ctxLinha = document.getElementById('graficoLinha');

    // Verifica se os elementos canvas dos gráficos existem antes de tentar inicializá-los
    if (ctxPizza && ctxBarras && ctxLinha) {
        // Cores neutras no estilo ZARA (usando as variáveis CSS)
        // Buscamos as cores do CSS para consistência
        const getCssVariable = (varName) => getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

        const colors = {
            primary: getCssVariable('--color-primary'),
            secondary: getCssVariable('--color-secondary'),
            accent1: getCssVariable('--color-accent1'),
            accent2: getCssVariable('--color-accent2'),
            text: getCssVariable('--color-text'),
            background: getCssVariable('--color-background')
        };

        // Função para gerar cores aleatórias, mas usando uma paleta mais neutra
        function generateChartColors(num) {
            const neutralPalette = [
                '#6D6D6D', '#9A9A9A', '#C7C7C7', '#7F8C8D', '#BDC3C7', '#A9A9A9', '#808080', '#D3D3D3'
            ];
            const result = [];
            for (let i = 0; i < num; i++) {
                result.push(neutralPalette[i % neutralPalette.length]);
            }
            return result;
        }

        // Dados fictícios para os gráficos
        const dadosVendas = {
            categorias: {
                labels: ['Blusas', 'Calças', 'Vestidos', 'Casacos', 'Saias', 'Acessórios'],
                data: [300, 250, 180, 120, 90, 60] // Quantidade de itens vendidos
            },
            mensal: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                vendas2024: [12000, 15000, 18000, 16000, 20000, 22000, 19000, 21000, 24000, 23000, 26000, 28000],
                vendas2025: [13000, 16000, 19000, 17000, 21000, 23000, 20000, 22000, 25000, 24000, 27000, 29000]
            },
            anual: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                totalVendas: [150000, 180000, 230000, 280000, 350000, 420000] // Total em R$
            }
        };

        // Função para inicializar todos os gráficos
        const initCharts = () => {
            // --- Gráfico de Pizza (Vendas por Categoria) ---
            new Chart(ctxPizza.getContext('2d'), {
                type: 'doughnut', // Usando doughnut para um visual mais moderno
                data: {
                    labels: dadosVendas.categorias.labels,
                    datasets: [{
                        label: 'Itens Vendidos',
                        data: dadosVendas.categorias.data,
                        backgroundColor: generateChartColors(dadosVendas.categorias.labels.length), // Cores dinâmicas
                        borderColor: colors.background,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right', // Legenda à direita para economizar espaço vertical
                            labels: {
                                color: colors.text,
                                font: {
                                    family: getCssVariable('--font-lato'),
                                }
                            }
                        },
                        title: {
                            display: false, // Título já está no HTML
                        }
                    }
                }
            });

            // --- Gráfico de Barras (Comparativo Mensal) ---
            new Chart(ctxBarras.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: dadosVendas.mensal.labels,
                    datasets: [
                        {
                            label: 'Vendas 2024 (R$)',
                            data: dadosVendas.mensal.vendas2024,
                            backgroundColor: colors.primary,
                            borderColor: colors.primary,
                            borderWidth: 1
                        },
                        {
                            label: 'Vendas 2025 (R$)',
                            data: dadosVendas.mensal.vendas2025,
                            backgroundColor: colors.secondary,
                            borderColor: colors.secondary,
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: colors.text,
                                font: {
                                    family: getCssVariable('--font-lato'),
                                }
                            }
                        },
                        title: {
                            display: false,
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: colors.text,
                                font: {
                                    family: getCssVariable('--font-lato'),
                                },
                                callback: function(value, index, values) {
                                    return 'R$ ' + value.toLocaleString('pt-BR'); // Formata para moeda
                                }
                            },
                            grid: {
                                color: colors.accent2 // Linhas de grade mais claras
                            }
                        },
                        x: {
                            ticks: {
                                color: colors.text,
                                font: {
                                    family: getCssVariable('--font-lato'),
                                }
                            },
                            grid: {
                                color: colors.accent2
                            }
                        }
                    }
                }
            });

            // --- Gráfico de Linha (Desempenho Anual) ---
            new Chart(ctxLinha.getContext('2d'), {
                type: 'line',
                data: {
                    labels: dadosVendas.anual.labels,
                    datasets: [{
                        label: 'Total de Vendas Anual (R$)',
                        data: dadosVendas.anual.totalVendas,
                        borderColor: colors.primary,
                        backgroundColor: 'rgba(51, 51, 51, 0.2)', // Cor primária com transparência para a área
                        borderWidth: 2,
                        tension: 0.3, // Curva suave na linha
                        fill: true, // Preenche a área abaixo da linha
                        pointBackgroundColor: colors.primary,
                        pointBorderColor: colors.primary,
                        pointHoverBackgroundColor: colors.background,
                        pointHoverBorderColor: colors.primary
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: colors.text,
                                font: {
                                    family: getCssVariable('--font-lato'),
                                }
                            }
                        },
                        title: {
                            display: false,
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: colors.text,
                                font: {
                                    family: getCssVariable('--font-lato'),
                                },
                                callback: function(value, index, values) {
                                    return 'R$ ' + value.toLocaleString('pt-BR'); // Formata para moeda
                                }
                            },
                            grid: {
                                color: colors.accent2
                            }
                        },
                        x: {
                            ticks: {
                                color: colors.text,
                                font: {
                                    family: getCssVariable('--font-lato'),
                                }
                            },
                            grid: {
                                color: colors.accent2
                            }
                        }
                    }
                }
            });
        };

        // Chama a função de inicialização dos gráficos
        initCharts();

    } // Fim do 'if (ctxPizza && ctxBarras && ctxLinha)'

}); // Fim do 'DOMContentLoaded'