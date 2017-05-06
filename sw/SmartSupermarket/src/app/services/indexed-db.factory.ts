
import { IndexedDbService } from '../services/indexed-db.service';

// fabrica e starta singleton indexeddb
export function IndexedDbFactory() {

  let dbService = new IndexedDbService('mercadinhoDb', 1);

  dbService.createStore(1, (evt) => {
    //produtos
    let objectStoreProd = evt.currentTarget.result.createObjectStore(
        'produtos', { keyPath: "id", autoIncrement: true });
    objectStoreProd.createIndex("id", "id", { unique: true });
    objectStoreProd.createIndex("nome", "nome", { unique: false });
    objectStoreProd.createIndex("preco", "preco", { unique: false });

    //tags
    let objectStoreTag = evt.currentTarget.result.createObjectStore(
        'tags', { keyPath: "uuid" });
    objectStoreTag.createIndex("uuid", "uuid", { unique: true });
    objectStoreTag.createIndex("prod_id", "prod_id", { unique: false });

    //compras
    let objectStoreCompras = evt.currentTarget.result.createObjectStore(
        'compras', { keyPath: "id", autoIncrement: true });
    objectStoreCompras.createIndex("id", "id", { unique: true });
    objectStoreCompras.createIndex("data", "data", { unique: false });
    objectStoreCompras.createIndex("preco", "preco", { unique: false });
    objectStoreCompras.createIndex("status", "status", { unique: false });

    //itemcompras
    let objectStoreItemCompra = evt.currentTarget.result.createObjectStore(
        'itemCompra', { keyPath: "id", autoIncrement: true });
    objectStoreItemCompra.createIndex("id", "id", { unique: true });
    objectStoreItemCompra.createIndex("id_compra", "id_compra", { unique: false });
    objectStoreItemCompra.createIndex("id_produto", "id_produto", { unique: false });
    objectStoreItemCompra.createIndex("preco", "preco", { unique: false });

    //logSerial
    let objectStoreLogSerial = evt.currentTarget.result.createObjectStore(
        'logSerial', { keyPath: "id", autoIncrement: true });
    objectStoreLogSerial.createIndex("id", "id", { unique: true });
    objectStoreLogSerial.createIndex("quando", "quando", { unique: false });
    objectStoreLogSerial.createIndex("dados", "dados", { unique: false });
    objectStoreLogSerial.createIndex("direcao", "direcao", { unique: false });

    //logServer
    let objectStoreLogServer = evt.currentTarget.result.createObjectStore(
        'logServer', { keyPath: "id", autoIncrement: true });
    objectStoreLogServer.createIndex("id", "id", { unique: true });
    objectStoreLogServer.createIndex("quando", "quando", { unique: false });
    objectStoreLogServer.createIndex("dados", "dados", { unique: false });
    objectStoreLogServer.createIndex("direcao", "direcao", { unique: false });

  }).then((xx)=> {
    console.log(xx, 'banco criado');
  });

  return dbService;

}
