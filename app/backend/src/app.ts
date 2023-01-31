import * as express from 'express';
import LoginRouter from './Router/LoginRouter';
import TeamRouter from './Router/TeamRouter';
import MatchesRouter from './Router/MatchesRouter';
import LeaderboardRoutes from './Router/LeaderboardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/login', LoginRouter); // iniciando a 3
    this.app.use('/teams', TeamRouter); // iniciando a 15
    this.app.use('/matches', MatchesRouter); // iniciando a 19s
    this.app.use('/leaderboard', LeaderboardRoutes); // iniciando a 29
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
