# Desenvolvimento de Extensões para Firefox (WebExtensions)

Este documento serve como um guia rápido e um repositório de links essenciais para a criação de extensões do Firefox (WebExtensions API). Ele é uma base de conhecimento genérica para ajudar no desenvolvimento de qualquer projeto de extensão.

## 📚 Documentação Oficial

A Mozilla mantém uma documentação excelente na MDN (Mozilla Developer Network).

*   **Página Principal (MDN Web Docs):** [Browser Extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
    *   *O ponto de partida para tudo relacionado a extensões.*
*   **Anatomia de uma Extensão:** [Anatomy of a WebExtension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)
    *   *Explica o que são background scripts, content scripts, popups, sidebars e como eles se comunicam.*
*   **Extension Workshop:** [Firefox Extension Workshop](https://extensionworkshop.com/)
    *   *Guia mais prático focado no fluxo de ponta a ponta (desenvolvimento, testes, publicação).*

## 🧩 APIs Essenciais Comuns

Aqui estão algumas das APIs mais frequentemente utilizadas no desenvolvimento de extensões:

*   **`sidebarAction` (Ações de Barra Lateral):** [sidebarAction API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/sidebarAction)
    *   *Permite criar, abrir, fechar e configurar o conteúdo que aparece na barra lateral do Firefox.*
*   **`storage` (Armazenamento):** [storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage)
    *   *Permite salvar dados específicos da extensão (usando `local` para a máquina atual ou `sync` para sincronizar na conta Firefox).*
*   **`action` (Botão de Ação):** [action API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/action) (No Manifest V2 era `browserAction`)
    *   *Controla o ícone que aparece na barra de ferramentas do navegador e suas interações.*

## ⚙️ Manifest V3 no Firefox

A Mozilla está fazendo a transição para o **Manifest V3**. É a melhor prática usar o V3 em projetos novos para garantir o funcionamento e a segurança a longo prazo.

*   **Visão Geral do MV3:** [Manifest V3 in Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Manifest_v3)
*   **Diferença crucial do Chrome:** Ao contrário do Chrome, que forçou o uso de *Service Workers* no Manifest V3, **o Firefox no MV3 continua suportando `Background Scripts` normais** e até Event Pages não-persistentes. Isso torna o desenvolvimento no Firefox muito mais estável para extensões que dependem de manipulação complexa ou lógicas contínuas.

## 🛠️ Ferramentas de Desenvolvimento

*   **Testando localmente (Temporary Add-on):**
    1.  Abra `about:debugging#/runtime/this-firefox` na barra de endereços do Firefox.
    2.  Clique em "Load Temporary Add-on...".
    3.  Selecione o arquivo `manifest.json` no diretório da extensão.
*   **`web-ext` (Ferramenta de Linha de Comando):** [Getting started with web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)
    *   *Ferramenta oficial da Mozilla (feita em Node.js) que permite rodar testes, recarregar a extensão automaticamente ao salvar arquivos e empacotar (zipar) a extensão para envio.*
    *   *Comando comum: `npx web-ext run` para iniciar o Firefox com a extensão já carregada e auto-reload habilitado.*

## 💡 Dicas Importantes e Boas Práticas

1.  **Sempre use Promises:** As APIs do Firefox (`browser.*`) retornam *Promises*. Enquanto o Chrome (`chrome.*`) tradicionalmente usava *callbacks* (embora esteja modernizando), o Firefox tem suporte nativo robusto. Use `async / await` ou `.then()` com `browser.*`.
2.  **Segurança e Permissões:** Peça apenas as permissões que você realmente precisa no `manifest.json`. Isso facilita a aprovação pela Mozilla caso deseje publicar a extensão na loja (AMO) e passa mais confiança ao usuário.
3.  **Clean Room Design (Design em Sala Limpa):** Ao se inspirar em código de terceiros com licenças restritas (como GPL ou MPL), estude a *lógica* e o *comportamento*, mas escreva todo o código do zero por conta própria. Use suas próprias estruturas e nomes de variáveis, garantindo que sua extensão será 100% original e livre para ser distribuída sob a licença de sua escolha.
