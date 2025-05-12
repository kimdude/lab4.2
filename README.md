# DT207G - Moment 4.2
## Autentisering och säkerhet

Repot innehåller källkoden för en webbplats med inloggnings- och registreringsformulär. Webbplatsen använder [ett API](https://github.com/kimdude/dt207g-moment4.1.git) från moment 4.1 för att registrera, logga in och ge åtkomst till användar sida. 


Vid registrering hashas lösenordet. När användaren loggar in skapas en JWT token som lagras i localstorage. När användare loggar in kontrolleras JWT token igen och vid godkänt JWT token skickas användaruppgifter för användaren själv. Om det inte godkänns skickas användaren tillbaka till inloggningsformuläret.

_Kim Dudenhöfer_
_2025-05-12_