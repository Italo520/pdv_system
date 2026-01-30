# PRD - Sistema PDV para Restaurantes (Next.js)

**Versão:** 1.0  
**Data:** 29 de Janeiro de 2026  
**Autor:** Product Manager  
**Status:** Aprovado

---

## 1. Visão Geral do Produto

### 1.1 Objetivo Principal e Proposta de Valor

Desenvolver um sistema PDV (Ponto de Venda) completo e integrado em Next.js, especializado para operações de restaurantes no Brasil, oferecendo uma solução única que abrange desde a frente de caixa até a gestão completa do negócio, com foco em:

- **Velocidade operacional**: Redução de tempo de atendimento em até 40%
- **Redução de erros**: Minimização de erros humanos através de automação
- **Conformidade fiscal**: Adequação completa à legislação brasileira (NFC-e obrigatória SP 2026)
- **Experiência do cliente**: Múltiplos canais de atendimento (presencial, delivery, QR code)

### 1.2 Problema que Resolve

- **Operações fragmentadas**: Restaurantes utilizam múltiplos sistemas desconectados
- **Erros de digitação**: Lançamento manual de valores gera discrepâncias financeiras
- **Desperdício de estoque**: Falta de controle de ficha técnica gera perdas de 15-20%
- **Não conformidade fiscal**: Multas e autuações por emissão incorreta de documentos fiscais
- **Atendimento lento**: Processos manuais prejudicam experiência do cliente

### 1.3 Público-Alvo e Stakeholders

**Público-Alvo Primário:**
- Restaurantes de pequeno a médio porte (2-10 unidades)
- Food trucks e dark kitchens
- Pizzarias e hamburguerias
- Cafeterias e lanchonetes

**Stakeholders:**
- **Donos/Gestores**: Controle financeiro, relatórios gerenciais, DRE
- **Garçons/Atendentes**: Interface rápida para lançamento de pedidos
- **Cozinha**: Sistema KDS para produção eficiente
- **Caixa/Financeiro**: Fechamento, conciliação, emissão fiscal
- **Clientes**: Experiência fluida de pedido e pagamento
- **Contador**: Exportação de dados fiscais e contábeis

### 1.4 Métricas de Sucesso (KPIs)

**Operacionais:**
- Tempo médio de lançamento de pedido: < 60 segundos
- Taxa de erro em pedidos: < 2%
- Uptime do sistema: > 99.5%
- Tempo médio de fechamento de conta: < 90 segundos

**Financeiros:**
- Redução de desperdício de estoque: 30%
- Redução de erros de caixa: 80%
- Aumento de ticket médio (combos inteligentes): 15%

**Conformidade:**
- 100% de emissões fiscais válidas
- Zero multas por não conformidade fiscal
- Tempo de contingência fiscal: < 1% das operações

---

## 2. Escopo e Limites

### 2.1 O que está DENTRO do Escopo

✅ **Front of House (Frente de Caixa)**
- Gestão visual de mesas e comandas
- Lançamento de pedidos com observações
- Sistema de combos inteligentes
- Venda fracionada (pizzas meio a meio)
- Checkout com divisão de conta
- Múltiplos meios de pagamento
- Integração TEF (máquinas de cartão)
- Cálculo automático de gorjeta/taxa de serviço

✅ **Back of House (Retaguarda)**
- Sistema KDS (Kitchen Display System)
- Impressão setorizada de pedidos
- Gestão de disponibilidade de itens
- Controle de produção em tempo real

✅ **Gestão de Estoque**
- Ficha técnica de produtos
- Baixa automática de insumos
- Controle de perdas e desperdícios
- Inventário cego
- Alertas de estoque mínimo

✅ **Módulo Delivery/Digital**
- Cardápio digital via QR Code
- Portal de autenticação por telefone
- Modo visualização Feed (Reels) e Lista
- Carrinho persistente entre modos
- Pedidos direto da mesa

✅ **Fiscal e Financeiro**
- Emissão NFC-e (Nota Fiscal de Consumidor Eletrônica)
- Suporte a SAT (São Paulo/Ceará) até 31/12/2025
- Certificado digital e-CNPJ A1
- Controle de caixa (abertura, sangria, fechamento)
- Conciliação de pagamentos
- DRE (Demonstração do Resultado do Exercício)
- Relatórios gerenciais

✅ **Infraestrutura Técnica**
- Arquitetura Next.js (SSR + API Routes)
- Sistema de impressão (ESC/POS)
- Modo offline (contingência)
- Sincronização automática
- Backup automatizado

### 2.2 O que está FORA do Escopo

❌ **Não Incluído na Versão Inicial (MVP):**
- Integração com iFood, Uber Eats, Rappi (será roadmap futuro)
- App mobile nativo (iOS/Android) - versão web responsiva apenas
- Programa de fidelidade/CRM avançado
- Integração com balanças
- Sistema de reservas online com confirmação automática
- Módulo de Recursos Humanos (folha de pagamento, ponto)
- E-commerce próprio para delivery
- BI avançado com Machine Learning
- Suporte a múltiplas empresas/franquias (multi-tenant complexo)

❌ **Limitações Técnicas Conhecidas:**
- Sistema não funcionará 100% offline (apenas modo contingência limitado)
- Vídeos no cardápio digital limitados a 30 segundos (performance)
- Histórico de pedidos mantido por 24 meses (depois arquivado)

### 2.3 Premissas e Restrições

**Premissas de Negócio:**
- Restaurante possui conexão com internet (mínimo 5 Mbps)
- Possui ao menos 1 impressora térmica (ESC/POS)
- Certificado digital e-CNPJ A1 válido (obrigatório para NFC-e)
- Máquina de cartão compatível com TEF (Sitef, Elgin, PayGo)
- Equipe receberá treinamento de 8 horas

**Restrições Técnicas:**
- Next.js 14+ (App Router)
- Node.js 18+
- PostgreSQL 15+ (banco principal)
- Redis (cache e filas)
- Hospedagem com suporte a WebSockets
- Certificado SSL/TLS válido

**Restrições Regulatórias:**
- Conformidade com LGPD (Lei Geral de Proteção de Dados)
- Adequação a Portaria SRE nº 79/2024 (NFC-e obrigatória SP 2026)
- Layout de NFC-e conforme manual de integração Sefaz estadual
- Armazenamento de XMLs fiscais por 5 anos
- Logs de auditoria por 3 anos

---

## 3. Requisitos Funcionais

### 3.1 Módulo Frente de Caixa (Front of House)

**[RF-001] Gestão Visual de Mesas**
- **Descrição**: Sistema deve exibir mapa visual de mesas com status em tempo real
- **Critérios de Aceitação**:
  - [ ] Visualização de layout de mesas configurável (arrastar e soltar)
  - [ ] Status visual: Livre (verde), Ocupada (amarelo), Conta Solicitada (laranja), Suja (vermelho)
  - [ ] Atualização em tempo real via WebSocket
  - [ ] Filtro por área/salão
  - [ ] Tempo de ocupação visível em cada mesa
- **Prioridade**: P0-Crítico

**[RF-002] Abertura e Gestão de Comandas**
- **Descrição**: Permitir abertura de comandas individuais ou por mesa
- **Critérios de Aceitação**:
  - [ ] Abertura rápida com número de comanda ou mesa
  - [ ] Atribuição de garçom responsável
  - [ ] Registro de horário de abertura
  - [ ] Suporte a múltiplas comandas por mesa
  - [ ] Histórico de comandas fechadas (últimas 24h acessível rapidamente)
- **Prioridade**: P0-Crítico

**[RF-003] Transferência de Itens entre Mesas/Comandas**
- **Descrição**: Mover itens consumidos de uma comanda/mesa para outra
- **Critérios de Aceitação**:
  - [ ] Seleção de itens específicos para transferência
  - [ ] Validação de mesa/comanda destino
  - [ ] Log de auditoria da transferência (quem, quando, o quê)
  - [ ] Recálculo automático de totais
  - [ ] Impressão de comprovante de transferência (opcional)
- **Prioridade**: P1-Alto

**[RF-004] Lançamento de Pedidos com Observações**
- **Descrição**: Interface rápida para adicionar itens com customizações
- **Critérios de Aceitação**:
  - [ ] Busca por nome, código ou categoria
  - [ ] Campo de observações livre (máx. 150 caracteres)
  - [ ] Adicionais pré-cadastrados (ex: extra bacon +R$5)
  - [ ] Opções de remoção (sem cebola, sem tomate)
  - [ ] Seleção de ponto de carne (mal passado, ao ponto, bem passado)
  - [ ] Quantidade ajustável
  - [ ] Preview do pedido antes de confirmar
- **Prioridade**: P0-Crítico

**[RF-005] Sistema de Combos Inteligentes**
- **Descrição**: Sugestão guiada de combos durante lançamento
- **Critérios de Aceitação**:
  - [ ] Ao adicionar item principal (ex: hambúrguer), sistema sugere bebida
  - [ ] Após bebida, sugere acompanhamento (batata, onion rings)
  - [ ] Desconto automático quando combo completo
  - [ ] Regras de combo configuráveis por categoria
  - [ ] Mensagem clara "Complete o combo e economize R$X"
  - [ ] Possibilidade de pular sugestões
- **Prioridade**: P1-Alto

**[RF-006] Venda Fracionada (Pizza Meio a Meio)**
- **Descrição**: Suporte a produtos fracionados com regras de preço
- **Critérios de Aceitação**:
  - [ ] Seleção de até 4 sabores por pizza (configurável)
  - [ ] Regras de preço: pela maior, média, soma de frações
  - [ ] Observações por sabor
  - [ ] Borda recheada opcional
  - [ ] Impressão na cozinha com separação clara dos sabores
  - [ ] Baixa de estoque proporcional por sabor
- **Prioridade**: P1-Alto

**[RF-007] Divisão de Conta**
- **Descrição**: Ferramenta para dividir conta de forma flexível
- **Critérios de Aceitação**:
  - [ ] Divisão igualitária por número de pessoas
  - [ ] Divisão manual por itens consumidos (arrastar itens para cada pessoa)
  - [ ] Pré-visualização de cada subtotal
  - [ ] Opção de incluir/excluir taxa de serviço por pessoa
  - [ ] Geração de múltiplos cupons fiscais
  - [ ] Pagamento individual ou em conjunto
- **Prioridade**: P0-Crítico

**[RF-008] Múltiplos Meios de Pagamento**
- **Descrição**: Aceitar diversos meios de pagamento em uma transação
- **Critérios de Aceitação**:
  - [ ] Dinheiro (com cálculo de troco)
  - [ ] PIX (com QR Code dinâmico)
  - [ ] Cartão de crédito (via TEF)
  - [ ] Cartão de débito (via TEF)
  - [ ] Vale-refeição/alimentação
  - [ ] Pagamento misto (ex: R$50 dinheiro + R$100 cartão)
  - [ ] Registro de todas as formas na NFC-e
- **Prioridade**: P0-Crítico

**[RF-009] Cálculo Automático de Gorjeta/Taxa de Serviço**
- **Descrição**: Adicionar taxa de serviço configurável
- **Critérios de Aceitação**:
  - [ ] Percentual configurável (10%, 12%, 13%, personalizado)
  - [ ] Opção de remoção pelo cliente
  - [ ] Edição manual do valor da taxa
  - [ ] Destaque visual na conta
  - [ ] Separação no DRE (receita de serviço vs. produtos)
  - [ ] Não incluir taxa no cálculo de comissões (configurável)
- **Prioridade**: P1-Alto

**[RF-010] Integração TEF (Transferência Eletrônica de Fundos)**
- **Descrição**: Comunicação direta com máquinas de cartão
- **Critérios de Aceitação**:
  - [ ] Suporte a Sitef, Elgin, PayGo
  - [ ] Envio automático do valor (sem digitação manual)
  - [ ] Retorno de status em tempo real (aprovado/negado)
  - [ ] Cancelamento de transação TEF
  - [ ] Log completo de transações
  - [ ] Tentativa de reconexão automática em caso de falha
  - [ ] Modo de contingência (digitação manual como fallback)
- **Prioridade**: P0-Crítico

### 3.2 Módulo Cozinha (Back of House)

**[RF-011] Sistema KDS (Kitchen Display System)**
- **Descrição**: Display digital para produção de pedidos
- **Critérios de Aceitação**:
  - [ ] Visualização em tempo real de pedidos novos
  - [ ] Ordenação por tempo de espera (FIFO ou prioridade)
  - [ ] Status: Novo → Em Preparo → Pronto → Entregue
  - [ ] Alertas visuais/sonoros para pedidos atrasados
  - [ ] Filtro por categoria (pratos quentes, frios, bebidas)
  - [ ] Indicação de observações em destaque
  - [ ] Sincronização com múltiplas telas (cozinha, bar, sobremesas)
- **Prioridade**: P0-Crítico

**[RF-012] Impressão Setorizada de Pedidos**
- **Descrição**: Envio automático para impressoras específicas
- **Critérios de Aceitação**:
  - [ ] Configuração de impressoras por categoria de produto
  - [ ] Bebidas → Bar
  - [ ] Pratos quentes → Cozinha
  - [ ] Sobremesas → Confeitaria
  - [ ] Impressão imediata ao confirmar pedido
  - [ ] Formatação clara: mesa, horário, observações
  - [ ] Reimpressão manual em caso de erro
  - [ ] Fila de impressão com retry automático
- **Prioridade**: P0-Crítico

**[RF-013] Gestão de Disponibilidade de Itens**
- **Descrição**: Bloquear itens esgotados no cardápio
- **Critérios de Aceitação**:
  - [ ] Botão rápido para marcar item como "Esgotado"
  - [ ] Bloqueio automático quando estoque chega a zero
  - [ ] Notificação em tempo real para todos os terminais
  - [ ] Reativação manual ou automática (com entrada no estoque)
  - [ ] Histórico de indisponibilidades
  - [ ] Mensagem exibida ao tentar adicionar item esgotado
- **Prioridade**: P1-Alto

### 3.3 Módulo Estoque e Ficha Técnica

**[RF-014] Cadastro de Ficha Técnica**
- **Descrição**: Definir composição de cada produto vendido
- **Critérios de Aceitação**:
  - [ ] Lista de insumos com quantidade por porção
  - [ ] Exemplo: 1 Hambúrguer = 1 pão + 180g carne + 1 queijo + 1 embalagem
  - [ ] Unidades de medida diversas (g, kg, ml, L, un)
  - [ ] Conversão automática de unidades
  - [ ] Custo calculado automaticamente baseado em preço de insumos
  - [ ] Versionamento de fichas técnicas (histórico de alterações)
- **Prioridade**: P0-Crítico

**[RF-015] Baixa Automática de Estoque**
- **Descrição**: Reduzir insumos ao vender produtos
- **Critérios de Aceitação**:
  - [ ] Ao fechar pedido, sistema abate insumos da ficha técnica
  - [ ] Baixa proporcional em vendas fracionadas
  - [ ] Log de movimentações com rastreabilidade
  - [ ] Reversão em caso de cancelamento de pedido
  - [ ] Validação: não permitir venda se estoque insuficiente (configurável)
  - [ ] Relatório de consumo real vs. teórico
- **Prioridade**: P0-Crítico

**[RF-016] Controle de Perdas e Desperdícios**
- **Descrição**: Registrar itens perdidos/estragados
- **Critérios de Aceitação**:
  - [ ] Motivos pré-cadastrados (vencimento, quebra, degustação, furto)
  - [ ] Registro de quantidade e justificativa
  - [ ] Aprovação gerencial para perdas acima de valor configurável
  - [ ] Relatório de perdas por período e categoria
  - [ ] Impacto no DRE (custo de perda)
  - [ ] Foto opcional do item perdido
- **Prioridade**: P2-Médio

**[RF-017] Inventário Cego**
- **Descrição**: Ferramenta para contagem física de estoque
- **Critérios de Aceitação**:
  - [ ] Geração de lista de contagem (sem quantidades do sistema)
  - [ ] Input de contagem física por operador
  - [ ] Comparação: físico vs. sistema
  - [ ] Relatório de divergências
  - [ ] Ajuste automático ou manual de estoque
  - [ ] Histórico de inventários realizados
  - [ ] Possibilidade de contagem parcial (por categoria)
- **Prioridade**: P2-Médio

**[RF-018] Alertas de Estoque Mínimo**
- **Descrição**: Notificações de reposição necessária
- **Critérios de Aceitação**:
  - [ ] Configuração de estoque mínimo por insumo
  - [ ] Notificação visual no dashboard
  - [ ] E-mail/SMS para gestor (configurável)
  - [ ] Lista de itens abaixo do mínimo
  - [ ] Sugestão de quantidade de compra baseada em consumo médio
  - [ ] Geração de pedido de compra pré-preenchido
- **Prioridade**: P1-Alto

### 3.4 Módulo Delivery e Cardápio Digital

**[RF-019] Cardápio Digital via QR Code**
- **Descrição**: Cliente acessa cardápio pelo celular
- **Critérios de Aceitação**:
  - [ ] QR Code único por mesa (parâmetro: ?mesa=12&token=xyz)
  - [ ] Geração e impressão de QR Codes no sistema
  - [ ] URL curta e amigável
  - [ ] Redirecionamento para portal de autenticação
  - [ ] Funcionamento em todos navegadores mobile
  - [ ] Versão PWA (instalável)
- **Prioridade**: P0-Crítico

**[RF-020] Portal de Autenticação (Gatekeeper)**
- **Descrição**: Identificação do cliente para pedidos
- **Critérios de Aceitação**:
  - [ ] Campo único: número de telefone (11 dígitos)
  - [ ] Validação de formato de telefone
  - [ ] Criação de sessão temporária vinculando Telefone + Mesa
  - [ ] Opção de envio de código SMS 4 dígitos (segurança extra)
  - [ ] Sessão expira em 4 horas ou ao sair da mesa
  - [ ] Possibilidade de múltiplos telefones por mesa
- **Prioridade**: P0-Crítico

**[RF-021] Modo Visualização Lista (Estático)**
- **Descrição**: Layout tradicional de cardápio (estilo iFood)
- **Critérios de Aceitação**:
  - [ ] Lista vertical de produtos
  - [ ] Categorias em scroll horizontal no topo
  - [ ] Busca por texto
  - [ ] Foto estática, nome, descrição curta, preço
  - [ ] Botão "+" para adicionar ao carrinho
  - [ ] Filtros: vegetariano, sem glúten, apimentado
  - [ ] Ordenação: mais vendidos, menor preço, A-Z
- **Prioridade**: P0-Crítico

**[RF-022] Modo Visualização Feed (Imersivo)**
- **Descrição**: Layout estilo Reels/TikTok para experiência visual
- **Critérios de Aceitação**:
  - [ ] Vídeo em loop (máx. 30 segundos)
  - [ ] Scroll vertical (arrasta para próximo prato)
  - [ ] Tela cheia no mobile
  - [ ] Overlay com nome, preço, botão "Ver Detalhes"
  - [ ] Seletor de quantidade flutuante
  - [ ] Botão "Adicionar ao Pedido" sobre o vídeo
  - [ ] Pills de categorias flutuantes para filtrar
  - [ ] Transição suave entre vídeos
- **Prioridade**: P1-Alto

**[RF-023] Carrinho Persistente entre Modos**
- **Descrição**: Manter itens ao alternar entre Lista e Feed
- **Critérios de Aceitação**:
  - [ ] Estado global do carrinho (Context API ou Redux)
  - [ ] Sincronização em tempo real
  - [ ] Adicionar item no Feed → aparece no carrinho da Lista
  - [ ] Remover item em qualquer modo reflete nos dois
  - [ ] Badge com contador de itens visível sempre
  - [ ] Persistência em localStorage (recuperar se sair e voltar)
- **Prioridade**: P0-Crítico

**[RF-024] Envio de Pedido da Mesa**
- **Descrição**: Cliente envia pedido direto para cozinha
- **Critérios de Aceitação**:
  - [ ] Revisão do pedido com total
  - [ ] Observações por item
  - [ ] Confirmação antes de enviar
  - [ ] Notificação para garçom/cozinha em tempo real
  - [ ] Adição à comanda existente da mesa
  - [ ] Status do pedido visível para cliente (Enviado → Preparando → Pronto)
  - [ ] Histórico de pedidos feitos pelo cliente naquela sessão
- **Prioridade**: P1-Alto

### 3.5 Módulo Fiscal e Financeiro

**[RF-025] Emissão de NFC-e (Nota Fiscal de Consumidor Eletrônica)**
- **Descrição**: Geração e transmissão de NFC-e para Sefaz
- **Critérios de Aceitação**:
  - [ ] Geração de XML conforme layout estadual
  - [ ] Assinatura digital com certificado e-CNPJ A1
  - [ ] Transmissão para webservice Sefaz
  - [ ] Retorno de protocolo de autorização
  - [ ] Geração de DANFE NFC-e com QR Code
  - [ ] Impressão automática após autorização
  - [ ] Armazenamento seguro de XMLs por 5 anos
  - [ ] Consulta de status da nota
  - [ ] Cancelamento de NFC-e (até 30 minutos)
  - [ ] Inutilização de numeração
- **Prioridade**: P0-Crítico

**[RF-026] Suporte a SAT (CF-e-SAT) até 31/12/2025**
- **Descrição**: Emissão via equipamento SAT (SP/CE)
- **Critérios de Aceitação**:
  - [ ] Comunicação com equipamento SAT via DLL/API
  - [ ] Geração de CF-e-SAT
  - [ ] Impressão de cupom com layout SAT
  - [ ] Cancelamento de CF-e-SAT
  - [ ] Transmissão para Sefaz (quando online)
  - [ ] Migração automática para NFC-e a partir de 01/01/2026
  - [ ] Alerta para gestores sobre fim do SAT
- **Prioridade**: P0-Crítico (até dez/2025)

**[RF-027] Gestão de Certificado Digital**
- **Descrição**: Upload e validação de certificado e-CNPJ A1
- **Critérios de Aceitação**:
  - [ ] Upload de arquivo .pfx
  - [ ] Input de senha do certificado
  - [ ] Validação de validade (data de expiração)
  - [ ] Armazenamento criptografado da senha
  - [ ] Alerta 30 dias antes do vencimento
  - [ ] Teste de comunicação com Sefaz (ambiente homologação)
  - [ ] Renovação facilitada
- **Prioridade**: P0-Crítico

**[RF-028] Controle de Abertura de Caixa**
- **Descrição**: Registro de início de operação do caixa
- **Critérios de Aceitação**:
  - [ ] Input de valor inicial (fundo de troco)
  - [ ] Identificação do operador
  - [ ] Horário de abertura automático
  - [ ] Obrigatoriedade de abertura antes de vendas
  - [ ] Múltiplos caixas simultâneos
  - [ ] Relatório de caixas abertos
- **Prioridade**: P0-Crítico

**[RF-029] Sangria e Reforço de Caixa**
- **Descrição**: Retirada/adição de dinheiro durante operação
- **Critérios de Aceitação**:
  - [ ] Sangria: retirada de valor com justificativa
  - [ ] Reforço: adição de troco
  - [ ] Aprovação gerencial obrigatória
  - [ ] Log com operador, horário, valor, motivo
  - [ ] Impacto no fechamento de caixa
  - [ ] Comprovante impresso
- **Prioridade**: P1-Alto

**[RF-030] Fechamento de Caixa (Cego)**
- **Descrição**: Encerramento com contagem física vs. sistema
- **Critérios de Aceitação**:
  - [ ] Input de contagem física por forma de pagamento
  - [ ] Cálculo automático de valores esperados (cego)
  - [ ] Comparação: físico vs. sistema
  - [ ] Relatório de divergências
  - [ ] Justificativa de diferenças
  - [ ] Aprovação gerencial para divergências > 1%
  - [ ] Bloqueio de novas vendas após fechamento
  - [ ] Geração de relatório PDF
- **Prioridade**: P0-Crítico

**[RF-031] Conciliação de Pagamentos TEF**
- **Descrição**: Verificar transações com operadoras
- **Critérios de Aceitação**:
  - [ ] Importação de arquivo de retorno das operadoras
  - [ ] Match automático: transação sistema vs. operadora
  - [ ] Identificação de divergências (valor, NSU)
  - [ ] Relatório de pendências
  - [ ] Marcação manual de conciliado
  - [ ] Export para contabilidade
- **Prioridade**: P2-Médio

**[RF-032] DRE Gerencial (Demonstração do Resultado do Exercício)**
- **Descrição**: Relatório financeiro gerencial
- **Critérios de Aceitação**:
  - [ ] Receita Bruta (por categoria de produto)
  - [ ] (-) Descontos e Cancelamentos
  - [ ] (=) Receita Líquida
  - [ ] (-) CMV (Custo de Mercadoria Vendida via ficha técnica)
  - [ ] (=) Lucro Bruto
  - [ ] (-) Despesas Operacionais (cadastradas)
  - [ ] (=) EBITDA
  - [ ] Filtros: período, unidade, categoria
  - [ ] Comparação com períodos anteriores
  - [ ] Export para Excel/PDF
  - [ ] Gráficos visuais de tendências
- **Prioridade**: P1-Alto

**[RF-033] Relatórios Gerenciais**
- **Descrição**: Dashboards e relatórios de gestão
- **Critérios de Aceitação**:
  - [ ] **Vendas**: Total, por período, por garçom, por produto
  - [ ] **Produtos mais vendidos**: Top 10, por categoria
  - [ ] **Horários de pico**: Gráfico de vendas por hora
  - [ ] **Ticket médio**: Evolução ao longo do tempo
  - [ ] **Taxa de ocupação**: Mesas por horário
  - [ ] **Tempo médio de atendimento**: Por mesa/comanda
  - [ ] **Estoque**: Giro, itens parados, rupturas
  - [ ] **Financeiro**: Fluxo de caixa, contas a pagar/receber
  - [ ] Export de todos relatórios
  - [ ] Agendamento de envio por e-mail
- **Prioridade**: P1-Alto

---

## 4. Requisitos Não-Funcionais

### 4.1 Performance e Escalabilidade

**[RNF-001] Tempo de Resposta**
- Lançamento de pedido: < 300ms
- Carregamento de cardápio digital: < 2s (First Contentful Paint)
- Abertura de comanda: < 500ms
- Fechamento de conta: < 1s
- Emissão de NFC-e: < 3s (após autorização Sefaz)

**[RNF-002] Capacidade de Processamento**
- Suportar até 500 comandas abertas simultâneas
- Processar até 50 pedidos/minuto em horário de pico
- Banco de dados dimensionado para 1 milhão de transações/mês
- Cache Redis para consultas frequentes (cardápio, mesas)

**[RNF-003] Escalabilidade**
- Arquitetura horizontal (adicionar instâncias Next.js)
- Load balancer para distribuição de carga
- CDN para assets estáticos e vídeos
- Banco de dados com read replicas

### 4.2 Segurança e Compliance

**[RNF-004] Autenticação e Autorização**
- Autenticação JWT com refresh tokens
- Níveis de acesso: Admin, Gerente, Caixa, Garçom, Cozinha
- Senha forte obrigatória (mín. 8 caracteres, maiúscula, número, especial)
- Timeout de sessão: 8 horas de inatividade
- Logs de acesso e ações críticas

**[RNF-005] Proteção de Dados (LGPD)**
- Criptografia AES-256 para dados sensíveis (senhas, certificados)
- Armazenamento de telefones/emails com consentimento
- Funcionalidade de exclusão de dados (direito ao esquecimento)
- Termos de uso e política de privacidade
- Logs de acesso a dados pessoais

**[RNF-006] Segurança Fiscal**
- Certificado digital armazenado em HSM ou software seguro
- Hash SHA-256 de XMLs fiscais
- Controle de numeração sequencial de notas
- Logs imutáveis de emissões fiscais
- Backup diário de XMLs em storage separado

**[RNF-007] Comunicação Segura**
- HTTPS obrigatório (TLS 1.3)
- Comunicação com Sefaz via mTLS (mutual TLS)
- API endpoints protegidos contra CSRF
- Rate limiting (100 req/min por IP)
- Sanitização de inputs (proteção XSS/SQL Injection)

### 4.3 Usabilidade e Acessibilidade

**[RNF-008] Interface de Usuário**
- Design responsivo (mobile, tablet, desktop)
- Modo escuro/claro (preferência do usuário)
- Fonte mínima 14px (legibilidade)
- Contraste mínimo WCAG AA (4.5:1)
- Feedback visual imediato em ações (loading states)

**[RNF-009] Acessibilidade**
- Suporte a leitores de tela (ARIA labels)
- Navegação por teclado completa (Tab, Enter, Esc)
- Foco visível em elementos interativos
- Textos alternativos em imagens
- Formulários com labels associados

**[RNF-010] Experiência Mobile (Cardápio Digital)**
- PWA instalável (Add to Home Screen)
- Funcionamento offline básico (cache de cardápio)
- Touch gestures intuitivos (swipe, pinch)
- Carregamento progressivo de imagens/vídeos
- Modo retrato otimizado

### 4.4 Confiabilidade e Disponibilidade

**[RNF-011] Disponibilidade**
- Uptime: 99.5% (downtime máximo: 3.6h/mês)
- Janela de manutenção: 3h às terças-feiras 3h-6h
- Monitoramento 24/7 (Uptime Robot, Datadog, Sentry)
- Alertas automáticos para: erro 500, tempo resposta > 5s, disco > 80%

**[RNF-012] Backup e Recuperação**
- Backup completo diário (banco + arquivos)
- Backup incremental a cada 6 horas
- Retenção: 30 dias online, 12 meses em cold storage
- RTO (Recovery Time Objective): 4 horas
- RPO (Recovery Point Objective): 6 horas
- Testes de restore trimestrais

**[RNF-013] Modo Contingência (Offline)**
- Cache local de cardápio e mesas
- Fila de pedidos para envio quando online
- Impressão local mesmo sem conexão
- Alerta visual de modo offline
- Sincronização automática ao restabelecer conexão
- Limite: até 100 pedidos em fila offline

**[RNF-014] Tratamento de Erros**
- Mensagens de erro amigáveis (sem stack traces para usuário)
- Log detalhado para debug (Sentry, CloudWatch)
- Fallbacks graceful (ex: se NFC-e falhar, sugerir cupom manual)
- Retry automático em integrações externas (3x com backoff exponencial)
- Health checks: /api/health (status de subsistemas)

---

## 5. Arquitetura e Stack Técnico

### 5.1 Componentes Principais do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                      CAMADA DE APRESENTAÇÃO                  │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   PDV Web    │  │ Cardápio PWA │  │  KDS Display │     │
│  │  (Desktop)   │  │   (Mobile)   │  │  (Cozinha)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS/WSS
┌─────────────────────────────────────────────────────────────┐
│                  CAMADA DE APLICAÇÃO (Next.js)               │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐     │
│  │              Next.js 14 App Router                 │     │
│  ├────────────────────────────────────────────────────┤     │
│  │  • Server Components      • API Routes             │     │
│  │  • Server Actions         • Middleware             │     │
│  │  • Streaming SSR          • Edge Runtime           │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Auth Module │  │ Order Module │  │ Stock Module │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Fiscal Module│  │  Payment API │  │ Reports API  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     CAMADA DE SERVIÇOS                       │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  WebSocket   │  │  Job Queue   │  │    Cache     │     │
│  │   Server     │  │   (BullMQ)   │  │   (Redis)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      CAMADA DE DADOS                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │  S3/Storage  │  │    Logs      │     │
│  │   (Primary)  │  │  (Arquivos)  │  │  (CloudWatch)│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  INTEGRAÇÕES EXTERNAS                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Sefaz     │  │  TEF (Sitef, │  │   Printer    │     │
│  │  (NFC-e/SAT) │  │ Elgin, PayGo)│  │  (ESC/POS)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  SMS/Email   │  │     CDN      │                        │
│  │   Gateway    │  │ (CloudFlare) │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Tecnologias Recomendadas

**Frontend:**
- **Next.js 14+** (App Router, Server Components, Server Actions)
- **React 18+** (Concurrent Features, Suspense)
- **TypeScript 5+** (Type Safety)
- **Tailwind CSS** (Styling rápido e responsivo)
- **Shadcn/ui** (Componentes acessíveis)
- **Zustand** ou **Jotai** (State management leve)
- **React Query (TanStack Query)** (Data fetching e cache)
- **React Hook Form** + **Zod** (Validação de formulários)
- **Framer Motion** (Animações)

**Backend (Next.js API Routes):**
- **Next.js API Routes** (API REST)
- **Server Actions** (Mutações com zero-bundle no client)
- **Prisma ORM** (Type-safe database access)
- **PostgreSQL 15+** (Banco relacional)
- **Redis 7+** (Cache e filas)
- **BullMQ** (Job queue para tasks assíncronas)
- **Socket.io** ou **Pusher** (WebSocket real-time)

**Infraestrutura:**
- **Vercel** (Deploy de Next.js - recomendado) ou **AWS ECS**
- **AWS RDS PostgreSQL** ou **Supabase** (Database gerenciado)
- **AWS ElastiCache Redis** ou **Upstash Redis**
- **AWS S3** (Armazenamento de arquivos/XMLs)
- **CloudFront** (CDN para assets/vídeos)
- **Cloudflare** (DNS, DDoS protection, WAF)

**Segurança e Autenticação:**
- **NextAuth.js v5 (Auth.js)** (Autenticação completa)
- **Argon2** ou **bcrypt** (Hash de senhas)
- **jose** (JWT handling)
- **node-forge** ou **crypto** (Certificado digital)

**Fiscal e Integrações:**
- **NFe.io SDK** ou **Focus NFe** (Facilitador NFC-e) ou desenvolver direto
- **Axios** (HTTP client para Sefaz)
- **xml2js** (Parse de XMLs fiscais)
- **Sitef SDK** / **Elgin SDK** / **PayGo SDK** (TEF)
- **node-thermal-printer** (Impressão ESC/POS)

**Monitoramento e Logs:**
- **Sentry** (Error tracking)
- **Datadog** ou **New Relic** (APM)
- **Winston** ou **Pino** (Logging estruturado)
- **Prometheus** + **Grafana** (Métricas personalizadas)

**Testes:**
- **Vitest** (Unit tests)
- **Playwright** (E2E tests)
- **React Testing Library** (Component tests)
- **Supertest** (API tests)

### 5.3 Integrações Necessárias

**Fiscal:**
- **Sefaz (Webservice NFC-e)**: Homologação e Produção por estado
- **SAT (até dez/2025)**: Comunicação via DLL nativa (Windows) ou Wine (Linux)
- **Certificado Digital A1**: Armazenamento seguro e renovação

**Pagamentos:**
- **TEF Sitef** (Clisitef API)
- **TEF Elgin** (ElginTEF SDK)
- **TEF PayGo** (PayGoWeb API)
- **PIX**: Integração com PSP (ex: Banco do Brasil, Sicredi, QRPIX)

**Impressão:**
- **Impressoras Térmicas**: Protocolo ESC/POS via USB/Rede/Bluetooth
- **Modelos recomendados**: Elgin i9, Bematech MP-4200 TH, Epson TM-T20

**Notificações:**
- **SMS**: Twilio, Zenvia
- **E-mail**: SendGrid, Amazon SES
- **WhatsApp** (futuro): Twilio API, WATI

**CDN e Storage:**
- **Vídeos do Cardápio**: CloudFlare Stream ou AWS S3 + CloudFront
- **Imagens**: Otimização com next/image + CDN

---

## 6. User Stories

### 6.1 Garçom (Atendente)

**US-001**: Como **garçom**, eu quero **ver visualmente quais mesas estão ocupadas** para **atender clientes que chegam rapidamente**.

**US-002**: Como **garçom**, eu quero **abrir uma comanda rapidamente digitando só o número** para **não perder tempo com formulários complexos**.

**US-003**: Como **garçom**, eu quero **lançar pedidos com observações de forma fácil** para **atender necessidades específicas dos clientes** (ex: "sem cebola", "mal passado").

**US-004**: Como **garçom**, eu quero **receber sugestões de combos durante o pedido** para **aumentar o ticket médio sem esquecer de oferecer**.

**US-005**: Como **garçom**, eu quero **dividir a conta entre várias pessoas de forma visual** para **facilitar o pagamento em grupos**.

**US-006**: Como **garçom**, eu quero **transferir itens entre mesas rapidamente** para **corrigir erros ou atender solicitações de clientes**.

### 6.2 Cozinha (Chef/Cozinheiro)

**US-007**: Como **cozinheiro**, eu quero **ver todos os pedidos pendentes em ordem** para **organizar minha produção e evitar atrasos**.

**US-008**: Como **cozinheiro**, eu quero **marcar pedidos como "em preparo" e "pronto"** para **comunicar o status ao salão**.

**US-009**: Como **cozinheiro**, eu quero **receber alertas visuais/sonoros de pedidos atrasados** para **priorizar o que está demorado**.

**US-010**: Como **cozinheiro**, eu quero **ver observações dos clientes em destaque** para **não esquecer de preparados especiais**.

**US-011**: Como **cozinheiro**, eu quero **bloquear itens que acabaram** para **evitar que garçons vendam o que não tenho**.

### 6.3 Caixa (Operador de Caixa)

**US-012**: Como **operador de caixa**, eu quero **fechar contas rapidamente aceitando múltiplas formas de pagamento** para **agilizar a fila no caixa**.

**US-013**: Como **operador de caixa**, eu quero **que o sistema envie o valor automaticamente para a máquina de cartão** para **evitar erro de digitação**.

**US-014**: Como **operador de caixa**, eu quero **adicionar gorjeta de 10% automaticamente com opção de remover** para **seguir o padrão do restaurante**.

**US-015**: Como **operador de caixa**, eu quero **emitir a nota fiscal automaticamente após o pagamento** para **estar sempre em conformidade fiscal**.

**US-016**: Como **operador de caixa**, eu quero **fazer sangria e reforço de caixa de forma simples** para **gerenciar o fundo de troco**.

**US-017**: Como **operador de caixa**, eu quero **fechar o caixa cegamente (sem ver o esperado)** para **evitar "acertar" os valores**.

### 6.4 Gerente/Dono

**US-018**: Como **gerente**, eu quero **visualizar um dashboard em tempo real com vendas do dia** para **acompanhar a performance**.

**US-019**: Como **gerente**, eu quero **ver relatórios de produtos mais vendidos** para **decidir promoções e ajustar cardápio**.

**US-020**: Como **gerente**, eu quero **receber alertas de estoque baixo** para **fazer pedidos de reposição em tempo**.

**US-021**: Como **gerente**, eu quero **ver o DRE mensal com lucro bruto e líquido** para **entender a saúde financeira do negócio**.

**US-022**: Como **gerente**, eu quero **acompanhar perdas e desperdícios** para **identificar problemas operacionais**.

**US-023**: Como **gerente**, eu quero **cadastrar fichas técnicas de produtos** para **ter controle preciso de custos**.

**US-024**: Como **gerente**, eu quero **configurar combos inteligentes** para **aumentar vendas sem esforço manual**.

**US-025**: Como **gerente**, eu quero **exportar dados para meu contador** para **facilitar a contabilidade**.

### 6.5 Cliente Final

**US-026**: Como **cliente**, eu quero **escanear um QR Code na mesa e ver o cardápio no meu celular** para **fazer pedidos sem chamar o garçom**.

**US-027**: Como **cliente**, eu quero **alternar entre ver o cardápio em lista ou em vídeos (Reels)** para **escolher da forma que preferir**.

**US-028**: Como **cliente**, eu quero **adicionar itens ao carrinho e ver o total em tempo real** para **controlar quanto vou gastar**.

**US-029**: Como **cliente**, eu quero **adicionar observações nos itens (ex: sem picles)** para **personalizar meu pedido**.

**US-030**: Como **cliente**, eu quero **ver o status do meu pedido (enviado, preparando, pronto)** para **saber quanto tempo vai demorar**.

**US-031**: Como **cliente**, eu quero **dividir a conta entre amigos pelo app** para **facilitar o pagamento em grupo**.

---

## 7. Fluxos de Usuário

### 7.1 Fluxo: Atendimento Completo (Garçom)

```
[INÍCIO]
   ↓
1. Cliente chega → Garçom consulta mapa de mesas
   ↓
2. Identifica mesa livre → Conduz cliente
   ↓
3. Abre comanda (digita número da mesa) → Sistema cria comanda
   ↓
4. Cliente escolhe pratos → Garçom busca no sistema
   ↓
5. Adiciona item → Sistema sugere combo
   ↓
6. Garçom oferece → Cliente aceita/recusa
   ↓
7. Adiciona observações ("mal passado")
   ↓
8. Confirma pedido → Sistema imprime na cozinha
   ↓
9. Cozinha prepara → Marca "Pronto" no KDS
   ↓
10. Garçom entrega → Cliente solicita conta
   ↓
11. Garçom fecha comanda → Sistema calcula total + taxa serviço
   ↓
12. Cliente paga (cartão) → Sistema integra TEF
   ↓
13. Pagamento aprovado → Sistema emite NFC-e automaticamente
   ↓
14. Imprime cupom fiscal → Entrega ao cliente
   ↓
15. Mesa marcada como "Suja" → Aguarda limpeza
   ↓
[FIM]
```

### 7.2 Fluxo: Pedido via Cardápio Digital (Cliente)

```
[INÍCIO]
   ↓
1. Cliente escaneia QR Code na mesa
   ↓
2. Abre cardápio digital → Solicita número de telefone
   ↓
3. Cliente digita telefone → Sistema cria sessão (Telefone + Mesa)
   ↓
4. Cliente escolhe modo: Lista ou Feed (Reels)
   ↓
   ├─ MODO LISTA
   │    ↓
   │  5a. Navega por categorias → Busca produto
   │    ↓
   │  6a. Clica "+" → Adiciona ao carrinho
   │
   └─ MODO FEED
        ↓
      5b. Scrolla verticalmente → Vê vídeo do prato
        ↓
      6b. Clica "Adicionar" → Escolhe quantidade
   ↓
7. Revisa carrinho → Adiciona observações
   ↓
8. Confirma pedido → Sistema envia para comanda da mesa
   ↓
9. Notificação em tempo real → Garçom vê no PDV
   ↓
10. Cozinha recebe no KDS → Prepara
   ↓
11. Cliente acompanha status no celular (Preparando → Pronto)
   ↓
12. Garçom entrega → Cliente solicita conta (pelo app ou presencial)
   ↓
[FIM]
```

### 7.3 Fluxo: Fechamento de Caixa (Operador)

```
[INÍCIO]
   ↓
1. Fim do expediente → Operador acessa "Fechar Caixa"
   ↓
2. Sistema bloqueia novas vendas naquele caixa
   ↓
3. Operador conta dinheiro físico → Insere valor
   ↓
4. Conta cartões (comprovantes TEF) → Insere total crédito/débito
   ↓
5. Conta PIX → Insere total PIX
   ↓
6. Sistema compara com valores esperados (CEGO)
   ↓
   ├─ DIVERGÊNCIA > 1%
   │    ↓
   │  7a. Sistema solicita justificativa
   │    ↓
   │  8a. Operador descreve motivo → Solicita aprovação gerencial
   │    ↓
   │  9a. Gerente analisa → Aprova/Reprova
   │
   └─ DIVERGÊNCIA <= 1%
        ↓
      7b. Sistema aprova automaticamente
   ↓
10. Sistema gera relatório de fechamento (PDF)
   ↓
11. Envia por e-mail para gerente e financeiro
   ↓
12. Caixa fechado → Libera para próxima abertura
   ↓
[FIM]
```

---

## 8. Dependências e Riscos

### 8.1 Dependências Externas

**Críticas (Bloqueiam operação):**
- **Sefaz**: Disponibilidade do webservice para emissão de NFC-e (SLA não garantido)
  - *Mitigação*: Modo contingência offline, fila de transmissão
- **Certificado Digital**: Renovação antes do vencimento
  - *Mitigação*: Alertas 30 dias antes, processo automatizado de renovação
- **Operadoras TEF**: Disponibilidade das redes (Rede, Cielo, Stone)
  - *Mitigação*: Fallback para digitação manual, suporte a múltiplas operadoras
- **Conexão com Internet**: Mínimo 5 Mbps estável
  - *Mitigação*: Modo offline limitado, backup 4G

**Importantes (Degradam experiência):**
- **Impressoras**: Falha de hardware/papel
  - *Mitigação*: Múltiplas impressoras configuradas, reimpressão facilitada
- **CDN**: Velocidade de carregamento de vídeos
  - *Mitigação*: Fallback para imagens estáticas, vídeos em múltiplas resoluções
- **SMS/E-mail**: Entrega de notificações
  - *Mitigação*: Múltiplos provedores, retry automático

### 8.2 Riscos Técnicos

**[RISCO-001] Indisponibilidade de Sefaz**
- **Probabilidade**: Média (histórico de instabilidades)
- **Impacto**: Alto (impede emissão fiscal)
- **Mitigação**:
  - Implementar modo contingência offline (NFC-e contingência)
  - Fila de transmissão com retry inteligente
  - Cupom não-fiscal como último recurso
  - Alerta ao gerente para decisão

**[RISCO-002] Perda de Conexão Durante Operação**
- **Probabilidade**: Média
- **Impacto**: Alto (paralisa atendimento)
- **Mitigação**:
  - Cache local de cardápio e mesas
  - Fila de pedidos offline (até 100 pedidos)
  - Impressão local independente de cloud
  - Sincronização automática ao reconectar
  - Indicador visual claro de modo offline

**[RISCO-003] Falha em Integração TEF**
- **Probabilidade**: Média
- **Impacto**: Alto (atrasa pagamentos)
- **Mitigação**:
  - Suporte a múltiplas plataformas TEF (Sitef, Elgin, PayGo)
  - Fallback para digitação manual de valor
  - Log detalhado para debug
  - Timeout configurável (30s default)
  - Opção de cancelar e pagar com outro meio

**[RISCO-004] Performance em Horário de Pico**
- **Probabilidade**: Alta (horário de almoço/jantar)
- **Impacto**: Médio (lentidão no sistema)
- **Mitigação**:
  - Cache Redis para consultas frequentes
  - Otimização de queries (N+1, índices)
  - WebSocket para updates em tempo real (evita polling)
  - Load testing semanal com cenários de pico
  - Auto-scaling de instâncias Next.js

**[RISCO-005] Certificado Digital Vencido**
- **Probabilidade**: Baixa (com alertas)
- **Impacto**: Crítico (impede emissão fiscal)
- **Mitigação**:
  - Alertas 60, 30, 15, 7 dias antes
  - E-mail + SMS para gestores
  - Processo de renovação documentado e facilitado
  - Backup do certificado em storage seguro

**[RISCO-006] Ataque DDoS/Segurança**
- **Probabilidade**: Baixa
- **Impacto**: Alto (sistema fora do ar)
- **Mitigação**:
  - Cloudflare com proteção DDoS
  - WAF (Web Application Firewall)
  - Rate limiting por IP (100 req/min)
  - Monitoramento de tráfego anômalo
  - Plano de resposta a incidentes

### 8.3 Riscos de Negócio

**[RISCO-007] Resistência da Equipe a Mudança**
- **Probabilidade**: Média
- **Impacto**: Médio (baixa adoção)
- **Mitigação**:
  - Treinamento de 8 horas obrigatório
  - Interface intuitiva com feedback visual
  - Suporte dedicado nas primeiras 2 semanas
  - Gamificação (metas de uso)
  - Demonstração de benefícios (tempo economizado)

**[RISCO-008] Mudanças na Legislação Fiscal**
- **Probabilidade**: Média (histórico de alterações)
- **Impacto**: Alto (não conformidade)
- **Mitigação**:
  - Monitoramento ativo de portarias Sefaz
  - Parceria com consultor fiscal
  - Arquitetura modular para fácil atualização
  - Testes em homologação antes de produção
  - Comunicação proativa com clientes sobre mudanças

**[RISCO-009] Concorrência com Sistemas Estabelecidos**
- **Probabilidade**: Alta
- **Impacto**: Médio (velocidade de adoção)
- **Mitigação**:
  - Diferenciação: cardápio digital Reels (único no mercado)
  - Preço competitivo (modelo SaaS acessível)
  - Onboarding facilitado (migração de dados)
  - Suporte superior (resposta < 4h)
  - ROI demonstrável (casos de sucesso)

**[RISCO-010] Custos de Infraestrutura Acima do Esperado**
- **Probabilidade**: Média
- **Impacto**: Médio (margem reduzida)
- **Mitigação**:
  - Monitoramento de custos em tempo real (AWS Cost Explorer)
  - Otimização contínua (cache, queries, assets)
  - Dimensionamento correto (não over-provisioning)
  - Uso de reserved instances/savings plans
  - Revisão mensal de uso

---

**Documento gerado com sucesso! ✅**

Este PRD completo contém todas as informações necessárias para iniciar o desenvolvimento do sistema PDV para restaurantes em Next.js.
