function ocultarLinks() {
    var links = document.querySelectorAll("#cronograma a"); // Seleciona todos os links dentro do cronograma

    for (var i = 0; i < links.length; i++) {
        links[i].style.display = "none"; // Oculta cada link
    }
}

function mostrarLinks() {
    var links = document.querySelectorAll("#cronograma a"); // Seleciona todos os links dentro do cronograma

    for (var i = 0; i < links.length; i++) {
        links[i].style.display = ""; // Restaura a exibição de cada link
    }
}

function imprimirCronograma() {
    var cronograma = document.getElementById("cronograma");

    // Oculta os links antes de imprimir
    ocultarLinks();

    // Ocultar todos os elementos da página, exceto o cronograma
    var elementosParaOcultar = document.body.children;
    for (var i = 0; i < elementosParaOcultar.length; i++) {
        if (elementosParaOcultar[i] !== cronograma) {
            elementosParaOcultar[i].style.display = "none";
        }
    }

    // Imprimir o cronograma
    window.print();

    // Restaurar a exibição dos elementos ocultos e dos links
    for (var i = 0; i < elementosParaOcultar.length; i++) {
        elementosParaOcultar[i].style.display = "";
    }
    mostrarLinks();
}
var menuBotao = document.getElementById("menuBotao");
var menuOpcoes = document.getElementById("menuOpcoes");
var cronogramaDiv = document.getElementById("cronograma");
var linksNoCronograma = cronogramaDiv.getElementsByTagName("a");

// Ocultar o menu de opções inicialmente
menuOpcoes.style.display = "none";

// Função para mostrar/ocultar o menu de opções
menuBotao.addEventListener("click", function(event) {
    event.stopPropagation(); // Impedir que o evento de clique se propague para o body
    if (menuOpcoes.style.display === "block") {
        menuOpcoes.style.display = "none";
    } else {
        menuOpcoes.style.display = "block";
        var conteudo = "<ul>";

        var aulas = {};

        // Iterar pelos links e agrupá-los por aula
        for (var i = 0; i < linksNoCronograma.length; i++) {
            var link = linksNoCronograma[i];
            var textoPai = link.parentNode.textContent;
            var data = textoPai.match(/\[\d{2}\/\d{2}\/\d{4}\]/); // Encontrar a data no texto

            if (data) {
                data = data[0].slice(1, -1); // Extrair a data sem colchetes

                // Se ainda não temos uma entrada para esta data, criamos uma
                if (!aulas[data]) {
                    aulas[data] = [];
                }

                // Adicionamos o link à lista de links desta data
                aulas[data].push(link);
            }
        }

        // Iterar pelas aulas e criar uma lista de links para cada uma
        for (var dataAula in aulas) {
            conteudo += "<li>" + dataAula + ": <ul>";
            var linksAula = aulas[dataAula];
            for (var j = 0; j < linksAula.length; j++) {
                var linkAula = linksAula[j];
                var nomeAula = linkAula.textContent;
                var hrefAula = linkAula.getAttribute("href");
                conteudo += "<li><a href='" + hrefAula + "'>" + nomeAula + "</a></li>";
            }
            conteudo += "</ul></li>";
        }

        conteudo += "</ul>";
        menuOpcoes.innerHTML = conteudo;
    }
});
var menuButton = document.getElementById("menu-button");
var menu = document.getElementById("menu");

menuButton.addEventListener("click", function() {
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }z
});
// Adicione um evento de clique aos links de navegação
document.querySelectorAll('.nav-item').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        
        // Obtém o ID da seção de destino do atributo href
        const targetId = this.getAttribute('href').substring(1);
        
        // Obtém a seção de destino pelo ID
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Calcula a posição de rolagem da seção de destino com uma compensação negativa de pixels (por exemplo, -20)
            const targetOffset = targetSection.offsetTop - 80; // Ajuste o valor conforme necessário
            
            // Realiza uma animação de rolagem suave até a seção de destino
            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });
            
            // Fecha o menu hambúrguer (se estiver aberto)
            navLinks.classList.remove("active");
        }
    });
});

