// ...existing code...
import InventoryTable from '../../Dashboard/Components/Tables/InventoryTable';
import StockAlertTable from '../../Dashboard/Components/Tables/StockAlertTable';

interface Celular {
  referencia: string;
  costo: number;
  software: string;
  fecha: string;
}

interface StockBajo {
  tipo: string;
  referencia: string;
  stock: number;
  marca_id?: number;
}

const InventoryModule = ({ celulares, stockBajo }: {
  celulares: Celular[],
  stockBajo: StockBajo[]
}) => (
  <>
    <InventoryTable data={celulares} />
    <StockAlertTable data={stockBajo} />
  </>
);

export default InventoryModule;
