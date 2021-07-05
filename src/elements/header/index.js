class Header extends HTMLElement {
  constructor() {
    super();
  }

  teste() {
    alert('foi')
  }

  connectedCallback() {
    this.innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-toggle" aria-controls="navbar-toggle" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" onclick="() => this.teste()">Newspapper</a>
    <div class="collapse navbar-collapse" id="navbar-toggle">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="../../pages/home/index.html">Início <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../../pages/education/index.html">Educação</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../../pages/health/index.html">Saúde</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../../pages/politics/index.html">Política</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../../pages/speak-to-us/index.html">Fale Conosco</a>
        </li>
      </ul>

      <!-- LOGIN BTN -->
      <button type="button" id='auth-modal-login-btn' data-toggle="modal" data-target="#authModal" class="btn btn-primary mr-md-2">Entrar</button>
      <!-- LOGIN BTN -->

      <!-- LOGIN MODAL -->
      <div class="modal fade" id="authModal" tabindex="-1" role="dialog" aria-labelledby="authModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="authModalTitle">Entre com sua conta</h5>
            </div>
            <form id='auth-form'>
            <div class="modal-body">
                <div class="form-group">
                  <label for="email">E-mail</label>
                  <input type="email" class="form-control" id="auth-email-input" placeholder="Seu e-mail">
                </div>
                <div class="form-group">
                  <label for="password">Senha</label>
                  <input type="password" class="form-control" id="auth-password-input" placeholder="Insira sua senha">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-link" data-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary">Entrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- LOGIN MODAL -->


      <!-- ACCOUNT DROP DOWN -->
      <div class="dropdown mr-md-2" id='account-dropdown' >
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Minha Conta
        </a>
      
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <span class="dropdown-item"><a href="../../pages/liked-news/index.html"></a> Notícias curtidas</span>
          <span class="dropdown-item" id='logout-btn'>Sair</span>
        </div>
      </div>
      <!-- ACCOUNT DROP DOWN -->

      <!-- SEARCH NEWS -->
      <form class="form-inline my-2 my-lg-0" id="search-form">
        <input class="form-control mr-sm-2" type="search" placeholder="Pesquisar notícia" id="search-input" aria-label="Search">
        <button class="btn btn-success my-2 my-sm-0" type="submit">Pesquisar</button>
      </form>
      <!-- SEARCH NEWS -->
    </div>
  </nav>`
  }
}

customElements.define('newspapper-header', Header)
