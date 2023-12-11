/***************************************************************************************************

    Script de calculo de HASH no padrão TISS
    Autor: Italo de Oliveira
    Data: 06/11/2023

***************************************************************************************************/

/***************************************************************************************************

    Parâmetros de execução

***************************************************************************************************/

var path = "C:\\Users\\italo.farias\\Downloads\\Modelo de requisição TISS\\Requisição 1.txt"; // e93ad50c8e030e4eda2a3d5bb577855a
var path = "C:\\Users\\italo.farias\\Downloads\\Modelo de requisição TISS\\Requisição 2.xml"; // b9068e5694bce7e1e0739ed6d529aea7

/***************************************************************************************************

    Funções auxiliares

***************************************************************************************************/

function gerarConteudo( conteudo ){

    var arrConteudoDasTags = [];

    var indiceEncerramento = conteudo.length;
    var indiceInicio;
    var conteudoTag;
    while( indiceEncerramento >= 0 ){

        if( conteudo.substr( indiceEncerramento, 2 ) == '</' ){

            indiceInicio = indiceEncerramento;
            while( conteudo.charAt(indiceInicio) != '>' ){

                if( conteudo.substr( indiceInicio, 2 ) == '</' && indiceEncerramento != indiceInicio ){

                    indiceInicio = indiceEncerramento;
                }
                indiceInicio--;
            }
            conteudoTag = (conteudo.substring( indiceInicio +1, indiceEncerramento )).trim();
            if( conteudoTag ){
                arrConteudoDasTags.unshift( conteudoTag );
            }
        }
        indiceEncerramento--;
    }
    arrConteudoDasTags.pop(); // Remove a tag hash

    return (arrConteudoDasTags.join('')).replace('\t', '').replace('&quot;', '"').replace( '&apos;', "'" );
};

function calcularHash( conteudoDasTags ){

    var md5  = new MD5();
    md5.update( conteudoDasTags );
    return md5.hexDigest().toLowerCase();
}

/***************************************************************************************************

    Script

***************************************************************************************************/

var conteudo = File.stringFromFile( path );
var conteudoDasTags = gerarConteudo( conteudo );
var hash = calcularHash( conteudoDasTags );

