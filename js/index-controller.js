
var app = angular.module('pretty-weather', []);

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.controller('IndexController', function($scope, $http) {

    var self = this;

    self.resposta = {};

    function chamarWebservices(){

        $http.get("https://api.hgbrasil.com/weather/?format=json&woeid=455933")
        .then(function(response) {
            configurarResposta(response.data);
        });

        $http.get("http://servicos.cptec.inpe.br/XML/cidade/244/condicoesAtuaisUV.xml")
        .then(function(response) {
            configurarRespostaXML(response.data);
        });

    }

    function configurarResposta(data){

        self.resposta = data;
        self.resposta.imagem = '';

        if(self.resposta.results.currently.indexOf('dia') > -1){

            if(self.resposta.results.description.indexOf('nuvens') > -1){
                self.resposta.imagem = 'dist/img/dia-nuvens-sol.png';
            }else if(self.resposta.results.description.indexOf('nublado') > -1){
                self.resposta.imagem = 'dist/img/dia-nublado.png';
            }else if(self.resposta.results.description.indexOf('Ensolarado') > -1){
                self.resposta.imagem = 'dist/img/dia-claro.png';
            }else if(self.resposta.results.description.indexOf('Chuva') > -1){
                self.resposta.imagem = 'dist/img/dia-chuvoso.png';
            }else if(self.resposta.results.description.indexOf('Tempestade') > -1){
                self.resposta.imagem = 'dist/img/dia-tempestade.png';
            }

        }else{

            if(self.resposta.results.description.indexOf('Céu') > -1){
                self.resposta.imagem = 'dist/img/noite-claro.png';
            }else if(self.resposta.results.description.indexOf('nublado') > -1){
                self.resposta.imagem = 'dist/img/noite-nublado.png';
            }else if(self.resposta.results.description.indexOf('nuvens') > -1){
                self.resposta.imagem = 'dist/img/noite-nuvens-lua.png';
            }else if(self.resposta.results.description.indexOf('Chuva') > -1){
                self.resposta.imagem = 'dist/img/noite-chuvoso.png';
            }else if(self.resposta.results.description.indexOf('Tempestade') > -1){
                self.resposta.imagem = 'dist/img/noite-tempestade.png';
            }

        }

        self.resposta.results.forecast.shift();

        var tam = 0;

        while(tam < self.resposta.results.forecast.length){

            if(self.resposta.results.forecast[tam].description.indexOf('nuvens') > -1){
                self.resposta.results.forecast[tam].imagem = 'dist/img/dia-nuvens-sol.png';
            }else if(self.resposta.results.forecast[tam].description.indexOf('nublado') > -1){
                self.resposta.results.forecast[tam].imagem = 'dist/img/dia-nublado.png';
            }else if(self.resposta.results.forecast[tam].description.indexOf('Ensolarado') > -1){
                self.resposta.results.forecast[tam].imagem = 'dist/img/dia-claro.png';
            }else if(self.resposta.results.forecast[tam].description.indexOf('Chuva') > -1){
                self.resposta.results.forecast[tam].imagem = 'dist/img/dia-chuvoso.png';
            }else if(self.resposta.results.forecast[tam].description.indexOf('chuviscos') > -1){
                self.resposta.results.forecast[tam].imagem = 'dist/img/dia-chuvoso.png';
            }else if(self.resposta.results.forecast[tam].description.indexOf('Tempestade') > -1){
                self.resposta.results.forecast[tam].imagem = 'dist/img/dia-tempestade.png';
            }

            tam++;

        }

        console.log(self.resposta.results);

    }

    function configurarRespostaXML(xml){

        var i = xml.indexOf("<iuv>");
        i += 5;
        var j = xml.indexOf("</iuv>");
        var iuv = xml.substring(i, j);

        self.resposta.iuv = {};
        self.resposta.iuv.uv = iuv;

        if(iuv < 3){
            self.resposta.iuv.descricao = "Baixo";
            self.resposta.iuv.imagem = "dist/img/iuv_baixo.png";
        }else if(iuv >= 3 && iuv <= 5){
            self.resposta.iuv.descricao = "Moderado";
            self.resposta.iuv.imagem = "dist/img/iuv_moderado.png";
        }else if(iuv >= 6 && iuv <= 7){
            self.resposta.iuv.descricao = "Alto";
            self.resposta.iuv.imagem = "dist/img/iuv_alto.png";
        }else if(iuv >= 8 && iuv <= 10){
            self.resposta.iuv.descricao = "Muito Alto";
            self.resposta.iuv.imagem = "dist/img/iuv_muito_alto.png";
        }else if(iuv > 10){
            self.resposta.iuv.descricao = "Extremo";
            self.resposta.iuv.imagem = "dist/img/iuv_extremo.png";
        }

    }

    self.trocarCidade = function(){

        alert("Funcionalidade indisponível.. ):");



    }

    function init(){
        chamarWebservices();
    }

    init();

});