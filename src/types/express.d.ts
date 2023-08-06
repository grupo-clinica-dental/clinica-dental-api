// en el modulo de express vamos a extender la interface de Request para tener los valores de typescript coarerespoondientes por ejemplo del user
declare namespace Express {
  export interface Request {
    user: any; // o tipo User si  existe en nuestros types
  }
}
