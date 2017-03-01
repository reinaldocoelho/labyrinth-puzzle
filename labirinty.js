/*
* ?????.
* @param userId = Usuário para registros.
*/
function Labirinty() {
    var _players = 4;
    var _baseBoardStructure = "";
    var _itemTypes = ["┌", "┐", "└", "┘", "├", "┤", "┬", "┴", "─", "│"];
    var _
    var _fixedBlocks = [
        // Fixed line 1
        {line: 1, column: 1, block: new BoardBlock(true, false, false, true, true, _itemTypes[0])}, 
        {line: 1, column: 3, block: new BoardBlock(true, false, true, true, true, _itemTypes[6])}, 
        {line: 1, column: 5, block: new BoardBlock(true, false, true, true, true, _itemTypes[6])}, 
        {line: 1, column: 7, block: new BoardBlock(true, false, true, true, false, _itemTypes[1])},
        // Fixed line 2
        {line: 3, column: 1, block: new BoardBlock(true, true, false, true, true, _itemTypes[4])},
        {line: 3, column: 3, block: new BoardBlock(true, true, false, true, true, _itemTypes[4])},
        {line: 3, column: 5, block: new BoardBlock(true, false, true, true, true, _itemTypes[6])}, 
        {line: 3, column: 7, block: new BoardBlock(true, true, true, true, false, _itemTypes[5])},
        // Fixed line 3
        {line: 5, column: 1, block: new BoardBlock(true, true, false, true, true, _itemTypes[4])},
        {line: 5, column: 3, block: new BoardBlock(true, true, true, false, true, _itemTypes[7])},
        {line: 5, column: 5, block: new BoardBlock(true, true, true, true, false, _itemTypes[5])},
        {line: 5, column: 7, block: new BoardBlock(true, true, true, true, false, _itemTypes[5])},
        // Fixed line 4
        {line: 7, column: 1, block: new BoardBlock(true, true, false, false, true, _itemTypes[2])},
        {line: 7, column: 3, block: new BoardBlock(true, true, true, false, true, _itemTypes[7])},
        {line: 7, column: 5, block: new BoardBlock(true, true, true, false, true, _itemTypes[7])},
        {line: 7, column: 7, block: new BoardBlock(true, true, true, false, false, _itemTypes[3])}
    ];
    var _dynamicBlocks = [];

    // // Padrões para opções da chamada.
    // var defaults = {
    //     QueueFilterFunction: function (page, globalSearch, callback) {
    //         var queueFilterStr = _queueId ? "&queueId=" + _queueId : "";
    //         var page = "../UserEmail/GetQueueEmails" + "?page=" + page + "&pageSize=" + PAGE_SIZE + "&globalFilter=" + globalSearch + queueFilterStr;
    //         $.getJSON(page, function (data) {
    //             // Para validar sessão é necessário carregar dependencia.
    //             //if (!isSessionAuthenticated(data)) return;
    //             if (data.status) {
    //                 callback(data.status, data.data);
    //                 return;
    //             }
    //             console.error("Erro ao tentar recuperar informações da pagina solicitada.", data);
    //             callback(data.status, data.data);
    //         }).fail(function () {
    //             console.error("Erro ao tentar carregar página da fila solicitada. Pagina=" + page + ".", jqxhr);
    //             callback(false, jqxhr);
    //         });
    //     },
    //     MyItemsFunction: function (page, globalSearch, callback) {
    //         var queueFilterStr = _queueId ? "&queueId=" + _queueId : "";
    //         var page = "../UserEmail/GetMyEmails" + "?page=" + page + "&pageSize=" + PAGE_SIZE + "&globalFilter=" + globalSearch + queueFilterStr;
    //         $.getJSON(page, function (data) {
    //             // Para validar sessão é necessário carregar dependencia.
    //             //if (!isSessionAuthenticated(data)) return;
    //             if (data.status) {
    //                 callback(data.status, data.data);
    //                 return;
    //             }
    //             console.error("Erro ao tentar recuperar informações da pagina solicitada.", data);
    //             callback(data.status, data.data);
    //         }).fail(function () {
    //             console.error("Erro ao tentar carregar página do operador solicitado. Pagina=" + page + ".", jqxhr);
    //             callback(false, jqxhr);
    //         });
    //     }
    // };
    // var opts = extend(defaults, options);

    //////////////////////////////////////////////
    // Public functions
    //////////////////////////////////////////////

    this.setTableOn = function (tagId) {
        if(!tagId || tagId.trim() == "") {
            alert("Informe um elemento com Id válido.");
        }
        _baseBoardStructure = tagId;
    }

    this.setPlayers = function(playerQuantity){
        if(playerQuantity < 2) alert("São necessários no mínimo 2 jogadores.");
        if(playerQuantity > 4) alert("São permitidos no máximo 4 jogadores.");
        _players = playerQuantity;
    }

    this.play = function () {
        if(!isValidConfig()){
            return;
        }
        createGameBoard();
    }

    // /* 
    // * Grava dados de sessão atualizada.
    // */
    // this.Store = function () {
    //     if (!_hasStorage) return;
    //     sessionStorage.setItem(_storageName, JSON.stringify(_storageData));
    // };

    /////////////////////////////////////////////
    // Private functions.
    /////////////////////////////////////////////

    // Construtor
    function _init() {
    };

    /*
    * Metodo interno de extensão de objetos para substituir o $.extend() do Jquery qye não é dependência da classe.
    */
    function extend() {
        for (var i = 1; i < arguments.length; i++)
            for (var key in arguments[i])
                if (arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }

    /*
    * Valida se as configurações básicas foram definidas para iniciar o jogo.
    */
    function isValidConfig() {
        if(!_baseBoardStructure || _baseBoardStructure.trim() == "") {
            alert("Informe um elemento com Id válido.");
            return false;
        }
        if(_players < 2) { alert("São necessários no mínimo 2 jogadores."); return false; }
        if(_players > 4) { alert("São permitidos no máximo 4 jogadores."); return false; }

        return true;
    }

    /* 
    * Cria a estrutura do tabuleiro.
    */
    function createGameBoard() {
        var baseElement = document.getElementById(_baseBoardStructure);
        var table = document.createElement("table");
        table.border = 1;
        var tbody = table.createTBody();
        for(var line = 0; line < 9; line++) {
            var tr = document.createElement("tr");
            for(var column = 0; column < 9; column++){
                var td = document.createElement("td");
                td.textContent = "X";
                definePositionType(line, column, td);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        baseElement.appendChild(table);
    };

    /*
    * Define se é uma posição fixa.
    */
    function definePositionType(line, column, td){
        if(line == 0 || column == 0 || line == 8 || column == 8){
            td.className += " action-item";
            return;
        }

        _fixedBlocks.forEach(function(element) {
            if(element.line == line && element.column == column){
                td.className += " locked-item";
                td.textContent = element.block.ContentRepresentation + element.block.Treasure.Image;
                return;
            }
        }, this);
    }

    /**
     * Função de embaralhar padrão para games.
     */
    function shuffle(array) {
        var i = 0
            , j = 0
            , temp = null;
        
        for(var i = array.length -1; i > 0; i-=1) {
            j = Math.floor(Math.random()*(i+1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    _init();
}

// 13 pecas soltas linha reta sem tesouros "│"
// 15 pecas soltas em L com Coruja, Aranha, Mariposa, Besouro, Rato, Lagarto "└"
// 6 pecas soltas em T com Morcego, Fauno, Fantasma, Princesa, Genio, Dragao "┬"
// 16 pecas fixas no tabuleiro com:
// Caveira, Espada, Moedas, Molho de chaves, Esmeralda, Elmo, Livro, Coroa, Bau, Candelabro, Mapa, Anel

/*
* Enumeration of treasure.
*/
Labirinty.treasureList = [
    { "Id": 0, "Description": "None", "Image": "" },
    { "Id": 1, "Description": "Rato", "Image": "R" },
    { "Id": 2, "Description": "Candelabro", "Image": "C" },
    { "Id": 3, "Description": "Mapa", "Image": "M" },
    { "Id": 4, "Description": "Besouro", "Image": "B" },
    { "Id": 5, "Description": "Caveira", "Image": "CA" },
    { "Id": 6, "Description": "Mariposa", "Image": "MA" },
    { "Id": 7, "Description": "Espada", "Image": "E" },
    { "Id": 8, "Description": "Livro", "Image": "L" },
    { "Id": 9, "Description": "Morcego", "Image": "MO" },
    { "Id": 10, "Description": "Dragao", "Image": "D" },
    { "Id": 11, "Description": "Genio", "Image": "G" },
    { "Id": 12, "Description": "Bau", "Image": "BA" },
    { "Id": 13, "Description": "Coruja", "Image": "CO" },
    { "Id": 14, "Description": "Lagarto", "Image": "LA" },
    { "Id": 15, "Description": "Coroa", "Image": "CR" },
    { "Id": 16, "Description": "Fantasma", "Image": "F" },
    { "Id": 17, "Description": "Aranha", "Image": "A" },
    { "Id": 18, "Description": "Fauno", "Image": "FA" },
    { "Id": 19, "Description": "Elmo", "Image": "EL" },
    { "Id": 20, "Description": "Anel", "Image": "AN" },
    { "Id": 21, "Description": "Molho de chaves", "Image": "MC" },
    { "Id": 22, "Description": "Moedas", "Image": "ME" },
    { "Id": 23, "Description": "Esmeralda", "Image": "ES" },
    { "Id": 24, "Description": "Princesa", "Image": "P" }
];
/*
* Enumeration of player color.
*/
Labirinty.player = { "Red": 1, "Yellow": 2, "Green": 3, "Blue": 4 };

/*
* Representa uma das peças do jogo.
* @param isLocked = Indicate if block can be moved.
* @param topWay = Indicate if top way is open to walk.
* @param leftWay = Indicate if left way is open to walk.
* @param bottonWay = Indicate if botton way is open to walk.
* @param rightWay = Indicate if right way is open to walk.
* @param contentRepresentation = Text or code to visual representation of peace.
* @param treasure = Optional, treasure associated to block.
*/
function BoardBlock(isLocked, topWay, leftWay, bottonWay, rightWay, contentRepresentation, treasure) {
    this.Locked = isLocked;
    this.TopWay = topWay;
    this.LeftWay = leftWay;
    this.RigthWay = rightWay;
    this.ContentRepresentation = contentRepresentation;
    this.Treasure = (!treasure) ? Labirinty.treasureList[0] : treasure;
    this.Players = [];

    //////////////////////////////////////////////
    // Public functions
    //////////////////////////////////////////////

    this.addPlayer = function (player) {
        this.Players.push(player);
    }

    this.removePlayer = function (player) {
        // Labirinty.player
        console.error("TODO: INCLUIR FUNCAO PARA REMOVER JOGADOR DO TABULEIRO.");
    }

    this.removeAllPlayers = function(){
        this.Players = [];
    }

    /////////////////////////////////////////////
    // Private functions.
    /////////////////////////////////////////////

    // Construtor
    function _init() {
    };

    _init();
}
