
import { IndexedDbService } from '../services/indexed-db.service';

// fabrica e starta singleton indexeddb
export function IndexedDbFactory() {

  let dbService = new IndexedDbService('mercadinhoDb', 1);

  dbService.createStore(1, (evt) => {
    //produtos
    let objectStoreProd = evt.currentTarget.result.createObjectStore(
        'produtos', { keyPath: "id", autoIncrement: true });
    objectStoreProd.createIndex("tag", "tag", { unique: true });
    objectStoreProd.createIndex("nome", "nome", { unique: false });
    objectStoreProd.createIndex("preco", "preco", { unique: false });

    //compras
    let objectStoreCompras = evt.currentTarget.result.createObjectStore(
        'compras', { keyPath: "id", autoIncrement: true });
    objectStoreCompras.createIndex("data", "data", { unique: false });
    objectStoreCompras.createIndex("preco", "preco", { unique: false });

    //itemcompras
    let objectStoreItemCompra = evt.currentTarget.result.createObjectStore(
        'itemCompra', { keyPath: "id", autoIncrement: true });
    objectStoreItemCompra.createIndex("id_compra", "id_compra", { unique: false });
    objectStoreItemCompra.createIndex("id_produto", "id_produto", { unique: false });
    objectStoreItemCompra.createIndex("preco", "preco", { unique: false });

  }).then((xx)=> {
    console.log(xx, 'banco criado');
  });

  return dbService;

}
