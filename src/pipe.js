//Author: Daniel Reynolds
//Purpose: Pipe data from one iframe to another
//Dependencies: none

let pipes = [];

function pipe(id, data){
    for(let i = 0; i < pipes.length; i++){
        if(pipes[i].id === id){
            pipes[i].accessPoint(data);
            return true;
        }
    }
    return false;
}

function createPipe(id, accessPoint){
    pipes.push({
        id:id,
        accessPoint:accessPoint
    });
    return id;
}