// 

PiezaArqueologicaController::altaPiezaArq(
    clasificador: TipoClasificador,
    nombre: String,
    material[1..*]: String,
    coleccion: ColeccionArqueologica = null,
    arqueologo: Arqueologo,
    sitioArq: SitioArqueologico,
    ubi: Ubicacion,
    desc: String = null,
    foto[0..*]: String,
    obs: String = null,
    docs[0..*]:Documento,
    fichaHist: FichaHistorica = null,
    fichaAdj: FichaAdjunta = null,
    clasInterna: ClasificacionInterna = null
) {


    PiezaArqueologicaBD.persistir(PiezaArqueologica.crear(clasificador,nombre,material[1..*],coleccion,arqueologo,sitioArq,ubi,desc,foto[1..*],obs,docs[0..*],fichaHist,fichaAdj,clasInterna));


    ubi.ocupar();
}


PiezaArqueologica :: crear (
    clasificador: TipoClasificador,
    nombre: String,
    material[1..*]: String,
    coleccion: ColeccionArqueologica = null,
    arqueologo: Arqueologo,
    sitioArq: SitioArqueologico,
    ubi: Ubicacion,
    desc: String = null,
    foto[0..*]: String,
    obs: String = null,
    docs[0..*]:Documento,
    fichaHist: FichaHistorica = null,
    fichaAdj: FichaAdjunta = null,
    clasInterna: ClasificacionInterna = null
) : PiezaArqueologica {

    p = self.new();
    p.setCodigo(PiezaArqueologicaBD.ultimoCod()+1); 
    p.setClasificador(clasificador);
    p.setNombre(nombre);
    p.agregarMaterial(material[1..*]);
    p.setColeccion(coleccion); 
    p.setArqueologo(arqueologo);
    p.setSitioArq(sitioArq);
    p.setUbicacion(ubi);
    p.setDescripcion(desc);
    p.setDisponible(true);
    if foto <> null then {
        p.agregarFoto(foto[1..*]);
    }
    if docs <> null then {
        p.agregarDocumentos(docs[0..*]);
    }
    if clasificador = "Interno" then {
        p.setFichaAdj(fichaAdj);
        p.setClasificacionInt(clasInterna);
        p.setFichaHist(null);
    }
    else {
        p.setFichaHist(fichaHist);
        p.setFichaAdj(null);
        p.setClasificacionInt(null);
    }
    return p
}

Ubicacion :: ocupar(){
    self.setDisponible(false)
    
}
