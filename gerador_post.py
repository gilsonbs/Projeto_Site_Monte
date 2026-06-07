import os
import re
from datetime import datetime

# Esta linha descobre onde o script gerador_post.py está salvo fisicamente
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Caminhos baseados na localização do script (Raiz do Projeto)
POSTS_DIR = os.path.join(BASE_DIR, "src", "content", "posts")
CATEGORIAS_DIR = os.path.join(BASE_DIR, "src", "content", "categorias")

def slugify(text):
    """Transforma o título em um nome de arquivo amigável"""
    import unicodedata
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    return re.sub(r'[-\s]+', '-', text).strip('-')

def listar_categorias():
    """Lê a pasta de categorias e retorna uma lista de IDs válidos"""
    categorias = []
    print(f"📂 Buscando categorias em: {CATEGORIAS_DIR}")
    
    if not os.path.exists(CATEGORIAS_DIR):
        print("❌ Erro: A pasta de categorias não foi encontrada!")
        return []

    arquivos = os.listdir(CATEGORIAS_DIR)
    for arquivo in arquivos:
        if arquivo.endswith(".json"):
            # Pega o nome do arquivo sem o .json (Ex: Fim-dos-Tempos)
            categorias.append(arquivo.replace(".json", ""))
    
    return categorias

def criar_post():
    print("\n" + "="*50)
    print("   ASSISTENTE DE POSTAGEM: MONTE DAS OLIVEIRAS")
    print("="*50 + "\n")

    # 1. Título e Slug
    titulo = input("Título da Notícia: ")
    slug = slugify(titulo)
    
    # 2. Seleção de Categoria
    categorias = listar_categorias()
    if not categorias:
        print("\n⚠️ Nenhuma categoria encontrada! Verifique se há arquivos .json em src/content/categorias/")
        return

    print(f"\n✅ {len(categorias)} categorias encontradas:")
    for i, cat in enumerate(categorias):
        print(f"   [{i}] {cat}")
    
    try:
        idx_cat = int(input("\nSelecione o número da categoria: "))
        categoria_selecionada = categorias[idx_cat]
    except (ValueError, IndexError):
        print("❌ Opção inválida!")
        return

    # 3. Metadados SEO
    meta_title = input("Título SEO (Meta Title): ")
    meta_desc = input("Descrição curta (Meta Description): ")

    # 4. Imagens
    img_url = input("Link da Imagem (Ex: /uploads/foto.jpg): ")
    alt_text = input("Descrição da imagem (Alt Text): ")

    # 5. Conteúdo
    print("\nEscreva ou cole o conteúdo da notícia (Enter para finalizar):")
    corpo = input("> ")

    # MONTAGEM DO MDX (Formato Astro v6)
    data_hoje = datetime.now().strftime("%Y-%m-%d")
    
    mdx_content = f"""---
title: "{titulo}"
categoria: "{categoria_selecionada}"
metaTitle: "{meta_title}"
metaDescription: "{meta_desc}"
imagemDestaque: "{img_url}"
altText: "{alt_text}"
date: {data_hoje}
---

{corpo}
"""

    # SALVAMENTO
    filename = f"{slug}.mdx"
    filepath = os.path.join(POSTS_DIR, filename)

    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(mdx_content)

    print(f"\n✨ TUDO PRONTO!")
    print(f"📄 Arquivo criado: {filename}")
    print(f"📍 Local: {filepath}")
    print("\nAgora é só salvar e o Astro atualizará o site automaticamente!")

if __name__ == "__main__":
    criar_post()