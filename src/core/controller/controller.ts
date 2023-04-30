import { Router } from 'express';

export interface Controller<Route> {
	expressRoute: Router;
	baseRoute: Route;
}

export default abstract class BaseController<Route> {
	public expressRoute: Router;
	public abstract baseRoute: Route;

	public constructor() {
		this.expressRoute = Router();
	}
}
