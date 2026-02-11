CREATE DATABASE inventario;
USE inventario;

-- =========================
-- TABLAS BASE
-- =========================

CREATE TABLE marcas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE proveedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- =========================
-- INVENTARIO DIARIO CELULARES
-- =========================
CREATE TABLE inv_dia_cel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    costo DECIMAL(10,2),
    referencia VARCHAR(100),
    software VARCHAR(50),
    tarjeta VARCHAR(50),
    display VARCHAR(50),
    tactil VARCHAR(50),
    visor VARCHAR(50),
    bateria VARCHAR(50),
    boton VARCHAR(50),
    ping VARCHAR(50),
    cam_tapas VARCHAR(50),
    bcver VARCHAR(50),
    mantenimiento VARCHAR(50),
    logica VARCHAR(50),
    entrega VARCHAR(50),
    abonos DECIMAL(10,2),
    fecha_entrega_pago DATE,
    no_entrega_o_garantia VARCHAR(100),
    devolucion VARCHAR(50),
    terceros_comentos TEXT
);

-- =========================
-- INVENTARIO DIARIO VISORES
-- =========================
CREATE TABLE inv_dia_visores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    sin_oca BOOLEAN,
    color VARCHAR(30),
    fecha DATE,
    codigo VARCHAR(50),
    proveedor_id INT,
    inventario_inicial INT,
    comp INT,
    t_ext INT,
    vta INT,
    ser_t INT,
    dev INT,
    t_inv_final INT,
    cost DECIMAL(10,2),
    vxm DECIMAL(10,2),
    rebaja DECIMAL(10,2),
    pedir BOOLEAN,
    celular VARCHAR(100),
    nota TEXT,
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

-- =========================
-- INVENTARIO DIARIO DISPLAY
-- =========================
CREATE TABLE inv_dia_display (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_marca_fk INT,
    version VARCHAR(50),
    color VARCHAR(30),
    calidad VARCHAR(30),
    r_f VARCHAR(30),
    fecha DATE,
    codigo VARCHAR(50),
    proveedor_id INT,
    inventario_inicial INT,
    vta INT,
    ser_t INT,
    dev INT,
    t_inv_final INT,
    cost DECIMAL(10,2),
    cost_venta DECIMAL(10,2),
    rebaja DECIMAL(10,2),
    pedir BOOLEAN,
    falt BOOLEAN,
    celular VARCHAR(100),
    nota TEXT,
    FOREIGN KEY (id_marca_fk) REFERENCES marcas(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

-- =========================
-- INVENTARIO DIARIO TAPA BACK
-- =========================
CREATE TABLE inv_dia_tapa_back (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_marca_fk INT,
    fecha DATE,
    codigo VARCHAR(50),
    proveedor_id INT,
    inventario_inicial INT,
    comp INT,
    t_ext INT,
    vta INT,
    ser_t INT,
    devolucion INT,
    t_inv_final INT,
    vxm DECIMAL(10,2),
    rebaja DECIMAL(10,2),
    pedir BOOLEAN,
    falta BOOLEAN,
    celular VARCHAR(100),
    nota TEXT,
    FOREIGN KEY (id_marca_fk) REFERENCES marcas(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

-- =========================
-- INVENTARIO DIARIO TACTIL
-- =========================
CREATE TABLE inv_dia_tactil (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_marca_fk INT,
    version VARCHAR(50),
    color VARCHAR(30),
    calidad VARCHAR(30),
    fecha DATE,
    codigo VARCHAR(50),
    proveedor_id INT,
    cantidad INT,
    costo DECIMAL(10,2),
    v_mayor DECIMAL(10,2),
    rebaja DECIMAL(10,2),
    pedir BOOLEAN,
    faltantes INT,
    celulares VARCHAR(100),
    devolucion INT,
    FOREIGN KEY (id_marca_fk) REFERENCES marcas(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

-- =========================
-- INVENTARIO DIARIO BATERIA ORIGINAL
-- =========================
CREATE TABLE inv_dia_bat_original (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_marca_fk INT,
    version VARCHAR(50),
    color VARCHAR(30),
    calidad VARCHAR(30),
    fecha DATE,
    codigo VARCHAR(50),
    proveedor_id INT,
    cantidad INT,
    costo DECIMAL(10,2),
    v_mayor DECIMAL(10,2),
    pedir BOOLEAN,
    faltantes INT,
    celulares VARCHAR(100),
    devolucion INT,
    FOREIGN KEY (id_marca_fk) REFERENCES marcas(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

-- =========================
-- INVENTARIO DIARIO BATERIA GENERICA
-- =========================
CREATE TABLE inv_dia_bat_generica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_marca_fk INT,
    version VARCHAR(50),
    color VARCHAR(30),
    calidad VARCHAR(30),
    fecha DATE,
    codigo VARCHAR(50),
    proveedor_id INT,
    cantidad INT,
    costo DECIMAL(10,2),
    v_mayor DECIMAL(10,2),
    rebaja DECIMAL(10,2),
    pedir BOOLEAN,
    faltantes INT,
    celulares VARCHAR(100),
    devolucion INT,
    FOREIGN KEY (id_marca_fk) REFERENCES marcas(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

-- =========================
-- INVENTARIO DIARIO REPUESTOS PEQUEÑOS
-- =========================
CREATE TABLE inv_dia_rptos_peq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_marca_fk INT,
    v3 INT,
    v8 INT,
    tc INT,
    tablet INT,
    chinos INT,
    mic_dig INT,
    power INT,
    audio INT,
    conector_carga INT,
    lector_huella INT,
    auricular INT,
    parlante INT,
    logic_carga INT,
    home INT,
    delantera_visor INT,
    trasera_visor INT,
    antena INT,
    porta_sim INT,
    boton_lateral INT,
    FOREIGN KEY (id_marca_fk) REFERENCES marcas(id)
);
