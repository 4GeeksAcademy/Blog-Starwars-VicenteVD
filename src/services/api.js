const API_BASE = "https://www.swapi.tech/api";

// Usamos el GitHub Pages del repo breatheco-de/swapi-images
const IMG_BASE = "https://breatheco-de.github.io/swapi-images/assets/img";

/**
 * Helper para peticiones GET
 */
export async function fetchResource(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error ${res.status} al obtener ${url}`);
  const json = await res.json();
  return json;
}

// ----------------------
// Listados paginados
// ----------------------
export async function getPeople(page = 1, limit = 10) {
  const url = `${API_BASE}/people?page=${page}&limit=${limit}`;
  const { results } = await fetchResource(url);
  return results.map(({ uid, name }) => ({ id: uid, name }));
}

export async function getPlanets(page = 1, limit = 10) {
  const url = `${API_BASE}/planets?page=${page}&limit=${limit}`;
  const { results } = await fetchResource(url);
  return results.map(({ uid, name }) => ({ id: uid, name }));
}

export async function getVehicles(page = 1, limit = 10) {
  const url = `${API_BASE}/vehicles?page=${page}&limit=${limit}`;
  const { results } = await fetchResource(url);
  return results.map(({ uid, name }) => ({ id: uid, name }));
}

// ----------------------
// Detalle de entidad
// ----------------------
export async function getEntityDetail(type, id) {
  const url = `${API_BASE}/${type}/${id}`;
  const { result } = await fetchResource(url);
  return {
    id: result.uid,
    entityType: type,
    name: result.properties.name,
    properties: result.properties,
  };
}

export const getPerson  = id => getEntityDetail("people", id);
export const getPlanet  = id => getEntityDetail("planets", id);
export const getVehicle = id => getEntityDetail("vehicles", id);

// ----------------------
// Construcción de URL de imagen
// ----------------------
export function getImageUrl(type, id) {
  let folder;
  switch (type) {
    case "people":
      folder = "characters";
      break;
    case "planets":
      folder = "planets";
      break;
    case "vehicles":
      // en este repo los vehículos están en la carpeta 'starships'
      folder = "starships";
      break;
    default:
      folder = type;
  }
  return `${IMG_BASE}/${folder}/${id}.jpg`;
}

// ----------------------
// Búsqueda con autocomplete
// ----------------------
export async function searchEntities(type, query, limit = 5) {
  const url = `${API_BASE}/${type}/?name=${encodeURIComponent(query)}&limit=${limit}`;
  const { results } = await fetchResource(url);
  return results.map(({ uid, name }) => ({
    id: uid,
    name,
    entityType: type,
  }));
}