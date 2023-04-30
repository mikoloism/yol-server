import HttpMethod from 'core/method.enum';

export interface RouterConfig<Route> {
	method: HttpMethod;
	route: Route;
}

export default class Endpoint<Route> implements RouterConfig<Route> {
	public constructor(public method: HttpMethod, public route: Route) {}
}
