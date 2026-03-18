import BRRepository from './repositories/background-remover.repository';
import BRService from './services/background-remover.service';
import { brController } from './controllers/background-remover.controller';

// // Manual injection:
// const brRepository = new BRRepository(); 
// const brService = new BRService(brRepository); // Inject repo into service
// const brController = new BRController(brService); // Inject service into controller

export { brController };