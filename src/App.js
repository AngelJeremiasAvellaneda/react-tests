import { useState } from 'react';
import './App.css';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          🛒 Tabla filtrable de productos
        </h2>

        <SearchBar
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={setFilterText}
          onInStockOnlyChange={setInStockOnly}
        />

        <ProductTable
          products={products}
          filterText={filterText}
          inStockOnly={inStockOnly}
        />
      </div>
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th
        colSpan="2"
        className="bg-purple-100 text-purple-700 text-left px-4 py-2 font-semibold uppercase"
      >
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    <span className="text-gray-800">{product.name}</span>
  ) : (
    <span className="text-red-500">{product.name}</span>
  );

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-2">{name}</td>
      <td className="px-4 py-2 text-right">{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (!product.name.toLowerCase().includes(filterText.toLowerCase())) return;
    if (inStockOnly && !product.stocked) return;

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table className="w-full border border-gray-200 mt-4 rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-purple-500 text-white">
          <th className="text-left px-4 py-2">Nombre</th>
          <th className="text-right px-4 py-2">Precio</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
      <input
        type="text"
        value={filterText}
        placeholder="🔍 Buscar productos..."
        onChange={(e) => onFilterTextChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <label className="flex items-center gap-2 text-gray-700">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          className="w-4 h-4 accent-purple-500"
        />
        Mostrar solo productos en stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  { category: 'Frutas', price: '$1', stocked: true, name: 'Manzana' },
  { category: 'Frutas', price: '$1', stocked: true, name: 'Fruta del dragón' },
  { category: 'Frutas', price: '$2', stocked: false, name: 'Maracuyá' },
  { category: 'Verduras', price: '$2', stocked: true, name: 'Espinaca' },
  { category: 'Verduras', price: '$4', stocked: false, name: 'Calabaza' },
  { category: 'Verduras', price: '$1', stocked: true, name: 'Guisantes' },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
