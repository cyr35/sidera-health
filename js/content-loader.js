/**
 * Content Loader - Carga textos desde archivos JSON
 * 
 * Este script permite editar todo el contenido del sitio
 * simplemente modificando los archivos JSON en /content/
 */

let currentContent = {};

async function loadContent(lang) {
  try {
    const response = await fetch(`/content/${lang}.json`);
    if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
    currentContent = await response.json();
    renderContent();
    return true;
  } catch (error) {
    console.error('Error loading content:', error);
    return false;
  }
}

function renderContent() {
  // Actualizar todos los elementos con data-content attribute
  document.querySelectorAll('[data-content]').forEach(element => {
    const path = element.getAttribute('data-content');
    const value = getNestedValue(currentContent, path);
    if (value && typeof value === 'string') {
      // Si contiene HTML, lo insertamos como HTML
      if (value.includes('<em>') || value.includes('<br>') || value.includes('&amp;')) {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Integración con el language switcher existente
const originalSetLang = window.setLang;
window.setLang = async function(lang) {
  if (originalSetLang) originalSetLang(lang);
  await loadContent(lang);
};

// Inicializar
document.addEventListener('DOMContentLoaded', async () => {
  const savedLang = localStorage.getItem('sidera-lang') || 'en';
  await loadContent(savedLang);
});