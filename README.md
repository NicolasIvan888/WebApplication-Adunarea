# Adunarea rapidă

O aplicație web educațională pentru exersarea calculului mental și a memoriei vizuale. Aplicația afișează succesiv o serie de numere, iar utilizatorul calculează suma în minte și verifică răspunsul la final.

## Funcționalități

- trei niveluri pentru lungimea secvenței: 5, 10 sau 15 numere;
- trei viteze de afișare;
- indicator vizual de progres;
- afișarea rezultatului prin buton sau tasta `Space`;
- interfață responsive, adaptată și pentru telefon;
- suport pentru navigare cu tastatura și reducerea animațiilor.

## Tehnologii

- ASP.NET Core Razor Pages;
- .NET 10;
- HTML, CSS și JavaScript fără framework client-side;
- GitHub Actions pentru build și publicare în Azure App Service.

## Rulare locală

Este necesar SDK-ul [.NET 10](https://dotnet.microsoft.com/download/dotnet/10.0).

```powershell
git clone https://github.com/NicolasIvan888/WebApplication-Adunarea.git
cd WebApplication-Adunarea
dotnet run --project "WebApplication Adunarea/WebApplication Adunarea.csproj"
```

Adresa locală este afișată în terminal după pornire.

## Structura proiectului

- `Pages/Index.cshtml` — interfața exercițiului;
- `wwwroot/js/site.js` — logica jocului;
- `wwwroot/css/site.css` — designul și adaptarea pentru ecrane mici;
- `.github/workflows` — automatizarea build-ului și publicării.

## Licență

Proiectul este disponibil sub licența [MIT](LICENSE).
