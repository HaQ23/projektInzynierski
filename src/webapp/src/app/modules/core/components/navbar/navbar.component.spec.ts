<nav class="desktop-nav nav">
  <div class="wrapper">
    <a routerLink="" class="nav__logo-box">
      <img
        src="../../../../../assets/images/logo.png"
        alt="Logo firmy quickCut"
        class="nav__logo"
      />
    </a>
    <div class="nav__links">
      <a routerLink="/" class="nav__link">Strona Główna</a>
      <a routerLink="services" class="nav__link">Usługi</a>
      <a routerLink="" class="nav__link">Kontakt</a>
      <a routerLink="" class="nav__link">O nas</a>
      <ng-container *ngIf="!isUserAuthenticated; else loggedIn">
        <a
          routerLink="/auth/login"
          mat-raised-button
          color="primary"
          class="nav__btn"
        >
          Zaloguj się
        </a>
      </ng-container>
      <ng-template #loggedIn>
        <button
          mat-icon-button
          color="primary"
          class="nav__btn nav__profile-btn"
          [routerLink]="userRole === 'ADMIN' ? '/admin' : '/user'"
          aria-label="Open user page"
        >
          <mat-icon class="icon">person</mat-icon>
        </button>
      </ng-template>
    </div>
  </div>
</nav>

<nav class="mobile-nav nav">
  <div class="box">
    <div class="nav__logo-box">
      <img
        src="../../../../../assets/images/logo.png"
        alt="Logo firmy quickCut"
        class="nav__logo"
      />
    </div>
    <button
      *ngIf="!openNavbar"
      class="ham__btn"
      mat-icon-button
      aria-label="Example icon button with a menu icon"
      (click)="toggleOpenNavbar()"
    >
      <mat-icon class="icon">menu</mat-icon>
    </button>
    <button
      *ngIf="openNavbar"
      class="ham__btn"
      mat-icon-button
      aria-label="Example icon button with a menu icon"
      (click)="toggleOpenNavbar()"
    >
      <mat-icon class="icon">close</mat-icon>
    </button>
  </div>
  <div class="nav__links" [ngClass]="{ active: openNavbar }">
    <a (click)="toggleOpenNavbar()" routerLink="/" class="nav__link">
      Strona Główna
    </a>
    <a (click)="toggleOpenNavbar()" routerLink="services" class="nav__link">
      Usługi
    </a>
    <a (click)="toggleOpenNavbar()" routerLink="" class="nav__link">Kontakt</a>
    <a (click)="toggleOpenNavbar()" routerLink="" class="nav__link">O nas</a>
    <ng-container *ngIf="!isUserAuthenticated; else loggedInMobile">
      <a
        routerLink="/auth/login"
        (click)="toggleOpenNavbar()"
        mat-raised-button
        color="primary"
        class="nav__btn"
      >
        Zaloguj się
      </a>
    </ng-container>
    <ng-template #loggedInMobile>
      <button
        mat-icon-button
        color="primary"
        class="nav__btn nav__profile-btn"
        [routerLink]="userRole === 'ADMIN' ? '/admin' : '/user'"
        aria-label="Open user page"
        (click)="toggleOpenNavbar()"
      >
        <mat-icon class="icon">person</mat-icon>
      </button>
    </ng-template>
  </div>
</nav>
