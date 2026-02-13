
import React from 'react';
import InvDiaCelTable from './InvDiaCelTable';
import MainHeader from '../../principal-Components/MainHeader';
import SidebarNav from '../../principal-Components/SidebarNav';

const InvDiaCel: React.FC = () => {
	return (
		<div className="container-fluid p-0 d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
			{/* SIDEBAR */}
			<nav className="d-none d-lg-flex flex-column p-3 text-white" style={{ width: '260px', backgroundColor: '#0f172a' }}>
				<SidebarNav />
			</nav>
			{/* CONTENIDO PRINCIPAL */}
			<main className="flex-grow-1">
				<MainHeader />
				<div className="p-4" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
					<div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
						<InvDiaCelTable />
					</div>
				</div>
			</main>
		</div>
	);
};

export default InvDiaCel;


