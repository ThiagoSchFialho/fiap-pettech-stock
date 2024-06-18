"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/http/controller/user/routes.ts
var routes_exports = {};
__export(routes_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/lib/pg/db.ts
var import_pg = require("pg");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.coerce.number().default(3e3),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number(),
  JWT_SECRET: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/lib/pg/db.ts
var CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT
};
var Database = class {
  constructor() {
    this.pool = new import_pg.Pool(CONFIG);
    this.connection();
  }
  connection() {
    return __async(this, null, function* () {
      try {
        this.client = yield this.pool.connect();
      } catch (error) {
        console.error(`Error connecting to database: ${error}`);
        throw new Error(`Error connecting to database:${error}`);
      }
    });
  }
  get clientInstance() {
    return this.client;
  }
};
var database = new Database();

// src/repositories/pg/user.repository.ts
var UserRepository = class {
  create(_0) {
    return __async(this, arguments, function* ({
      username,
      password
    }) {
      var _a;
      const result = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING *`,
        [username, password]
      );
      return result == null ? void 0 : result.rows[0];
    });
  }
  findWithPerson(userId) {
    return __async(this, null, function* () {
      var _a;
      const result = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `SELECT * FROM "user"
      LEFT JOIN person ON "user".id = person.user_id
      WHERE "user".id = $1`,
        [userId]
      );
      return result == null ? void 0 : result.rows[0];
    });
  }
  findByUserName(username) {
    return __async(this, null, function* () {
      var _a;
      const result = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `SELECT * FROM "user" WHERE "user".username = $1`,
        [username]
      );
      return result == null ? void 0 : result.rows[0];
    });
  }
};

// src/use-cases/create-user.ts
var CreateUserUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  handler(user) {
    return __async(this, null, function* () {
      return this.userRepository.create(user);
    });
  }
};

// src/use-cases/factory/make-create-user-use-case.ts
function makeCreateUserUseCase() {
  const userRepository = new UserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  return createUserUseCase;
}

// src/http/controller/user/create.ts
var import_bcryptjs = require("bcryptjs");
var import_zod2 = require("zod");
function create(request, reply) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod2.z.object({
      username: import_zod2.z.string(),
      password: import_zod2.z.string()
    });
    const { username, password } = registerBodySchema.parse(request.body);
    const hashedPassword = yield (0, import_bcryptjs.hash)(password, 8);
    const userWithHashedPassword = { username, password: hashedPassword };
    const createUserUseCase = makeCreateUserUseCase();
    const user = yield createUserUseCase.handler(userWithHashedPassword);
    return reply.status(201).send({ id: user == null ? void 0 : user.id, username: user == null ? void 0 : user.username });
  });
}

// src/use-cases/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found");
  }
};

// src/use-cases/find-with-person.ts
var FindWithPersonUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  handler(userId) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.findWithPerson(userId);
      if (!user) throw new ResourceNotFoundError();
      return this.userRepository.findWithPerson(userId);
    });
  }
};

// src/use-cases/factory/make-find-with-person-use-case.ts
function makeFindWithPersonUseCase() {
  const userRepository = new UserRepository();
  const findWithPersonUseCase = new FindWithPersonUseCase(userRepository);
  return findWithPersonUseCase;
}

// src/http/controller/user/find-user.ts
var import_zod3 = require("zod");
function findUser(request, reply) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod3.z.object({
      id: import_zod3.z.coerce.number()
    });
    const { id } = registerParamsSchema.parse(request.params);
    const findWithPersonUseCase = makeFindWithPersonUseCase();
    const user = yield findWithPersonUseCase.handler(id);
    return reply.status(200).send(user);
  });
}

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Username or password is incorrect");
  }
};

// src/use-cases/singin.ts
var SinginUseCase = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  handler(username) {
    return __async(this, null, function* () {
      const user = yield this.userRepository.findByUserName(username);
      if (!user) {
        throw new InvalidCredentialsError();
      }
      return user;
    });
  }
};

// src/use-cases/factory/make-singin-use-case.ts
function makeSinginUseCase() {
  const userRepository = new UserRepository();
  const singinUseCase = new SinginUseCase(userRepository);
  return singinUseCase;
}

// src/http/controller/user/singin.ts
var import_bcryptjs2 = require("bcryptjs");
var import_zod4 = require("zod");
function singin(request, reply) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod4.z.object({
      username: import_zod4.z.string(),
      password: import_zod4.z.string()
    });
    const { username, password } = registerBodySchema.parse(request.body);
    const singinUseCase = makeSinginUseCase();
    const user = yield singinUseCase.handler(username);
    const doestPasswordMath = yield (0, import_bcryptjs2.compare)(password, user.password);
    if (!doestPasswordMath) {
      throw new InvalidCredentialsError();
    }
    const token = yield reply.jwtSign({ username });
    return reply.status(200).send(token);
  });
}

// src/http/controller/user/routes.ts
function userRoutes(app) {
  return __async(this, null, function* () {
    app.get("/user/:id", findUser);
    app.post("/user", create);
    app.post("/user/signin", singin);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});
