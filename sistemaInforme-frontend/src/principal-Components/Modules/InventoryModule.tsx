// ...existing code...
import InventoryTable from '../../Dashboard/Components/Tables/InventoryTable';
import StockAlertTable from '../../Dashboard/Components/Tables/StockAlertTable';

// Puedes agregar lógica de rutas o tabs si lo deseas
const InventoryModule = ({ celulares, stockBajo }: {
  celulares: Array<{ id: number; referencia: string; costo: number; software: string; display: string; }>,
  stockBajo: Array<{ id: number; referencia: string; stock: number; }>
}) => (
  <>
    <InventoryTable data={celulares} />
    <StockAlertTable data={stockBajo} />
  </>
);

export default InventoryModule;
