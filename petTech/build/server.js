"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
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

// src/app.ts
var import_reflect_metadata = require("reflect-metadata");

// src/lib/typeorm/typeorm.ts
var import_typeorm3 = require("typeorm");

// src/entities/product.entity.ts
var import_typeorm2 = require("typeorm");

// src/entities/category.entity.ts
var import_typeorm = require("typeorm");
var Category = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("increment", {
    name: "id"
  })
], Category.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)({ name: "name", type: "varchar" })
], Category.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm.Column)({
    name: "creation_date",
    type: "timestamp without time zone",
    default: () => "CURRENT_TIMESTAMP"
  })
], Category.prototype, "createdAT", 2);
Category = __decorateClass([
  (0, import_typeorm.Entity)({
    name: "category"
  })
], Category);

// src/entities/product.entity.ts
var Product = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("uuid", {
    name: "id"
  })
], Product.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "name",
    type: "varchar"
  })
], Product.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "description",
    type: "text"
  })
], Product.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "image_url",
    type: "varchar"
  })
], Product.prototype, "image_url", 2);
__decorateClass([
  (0, import_typeorm2.Column)({
    name: "price",
    type: "double precision"
  })
], Product.prototype, "price", 2);
__decorateClass([
  (0, import_typeorm2.ManyToMany)(() => Category, {
    cascade: true
  }),
  (0, import_typeorm2.JoinTable)({
    name: "product_category",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "category_id",
      referencedColumnName: "id"
    }
  })
], Product.prototype, "categories", 2);
Product = __decorateClass([
  (0, import_typeorm2.Entity)({
    name: "product"
  })
], Product);

// src/lib/typeorm/migrations/1718304389598-ProductAutoGeneratedUUID.ts
var ProductAutoGeneratedUUID1718304389598 = class {
  // Caminho feliz
  up(queryRunner) {
    return __async(this, null, function* () {
      yield queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      `);
      yield queryRunner.query(`
      ALTER TABLE product
      ALTER COLUMN id SET DEFAULT uuid_generate_v4();
      `);
    });
  }
  // Caso aconteça algum erro
  down(queryRunner) {
    return __async(this, null, function* () {
      yield queryRunner.query(`
      ALTER TABLE product
      ALTER COLUMN id DROP DEFAULT;
      `);
    });
  }
};

// src/lib/typeorm/typeorm.ts
var appDataSource = new import_typeorm3.DataSource({
  type: "postgres",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [Product, Category],
  // entities: ['src/entities/*.ts']  Você pode passar o caminho em vez da classe
  // mas dessa forma usando o "*.ts" ele vai pegar todos os arquivos .ts da pasta "entities"
  migrations: [ProductAutoGeneratedUUID1718304389598],
  logging: env.NODE_ENV === "development"
});
appDataSource.initialize().then(() => {
  console.log("Database with typeorm connected");
}).catch((error) => {
  console.error("Error connecting to database with typeorm", error);
});

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/lib/pg/db.ts
var import_pg = require("pg");
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

// src/repositories/pg/person.repository.ts
var PersonRepository = class {
  create(_0) {
    return __async(this, arguments, function* ({
      cpf,
      name,
      birth,
      email,
      user_id
    }) {
      var _a;
      const result = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        "INSERT INTO person (cpf, name, birth, email, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [cpf, name, birth, email, user_id]
      );
      return result == null ? void 0 : result.rows[0];
    });
  }
};

// src/use-cases/create-person.ts
var CreatePersonUseCase = class {
  constructor(personRepository) {
    this.personRepository = personRepository;
  }
  handler(person) {
    return this.personRepository.create(person);
  }
};

// src/use-cases/factory/make-create-person-use-case.ts
function makeCreatePersonUseCase() {
  const personRepository = new PersonRepository();
  const createPersonUseCase = new CreatePersonUseCase(personRepository);
  return createPersonUseCase;
}

// src/http/controller/person/create.ts
var import_zod2 = require("zod");
function create(request, reply) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod2.z.object({
      cpf: import_zod2.z.string(),
      name: import_zod2.z.string(),
      birth: import_zod2.z.coerce.date(),
      email: import_zod2.z.string().email(),
      user_id: import_zod2.z.coerce.number()
    });
    const { cpf, name, birth, email, user_id } = registerBodySchema.parse(
      request.body
    );
    const createPersonUseCase = makeCreatePersonUseCase();
    const person = yield createPersonUseCase.handler({
      cpf,
      name,
      birth,
      email,
      user_id
    });
    return reply.status(201).send(person);
  });
}

// src/http/controller/person/routes.ts
function personRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/person", create);
  });
}

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
var import_zod3 = require("zod");
function create2(request, reply) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod3.z.object({
      username: import_zod3.z.string(),
      password: import_zod3.z.string()
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
var import_zod4 = require("zod");
function findUser(request, reply) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod4.z.object({
      id: import_zod4.z.coerce.number()
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
var import_zod5 = require("zod");
function singin(request, reply) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod5.z.object({
      username: import_zod5.z.string(),
      password: import_zod5.z.string()
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
function userRoutes(app2) {
  return __async(this, null, function* () {
    app2.get("/user/:id", findUser);
    app2.post("/user", create2);
    app2.post("/user/signin", singin);
  });
}

// src/utils/global-error-handler.ts
var import_process = require("process");
var import_zod6 = require("zod");
var errorHandlerMap = {
  ZodError: (error, _, reply) => {
    return reply.status(400).send(__spreadValues({
      message: "Validationerror"
    }, error instanceof import_zod6.ZodError && { error: error.format() }));
  },
  ResourceNotFoundError: (error, _, reply) => {
    return reply.status(400).send({ message: error.message });
  },
  InvalidCredentialsError: (error, _, reply) => {
    return reply.status(404).send({ message: error.message });
  }
};
var globalErrorHandler = (error, _, reply) => {
  if (import_process.env.NODE_ENV === "development") {
    console.error(error);
  }
  const handler = errorHandlerMap[error.constructor.name];
  if (handler) return handler(error, _, reply);
  return reply.status(500).send({ message: "Internal server error" });
};

// src/repositories/pg/address.repository.ts
var AddressRepository = class {
  findAddressByPersonId(personId, page, limit) {
    return __async(this, null, function* () {
      var _a;
      const offset = (page - 1) * limit;
      const query = `
    SELECT address.*, person.*
    FROM address
    JOIN person ON address.person_id = Person.id
    WHERE person.id = $1
    LIMIT $2 OFFSET $3
    `;
      const result = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        query,
        [personId, limit, offset]
      );
      return (result == null ? void 0 : result.rows) || [];
    });
  }
  create(_0) {
    return __async(this, arguments, function* ({
      street,
      city,
      state,
      zip_code,
      person_id
    }) {
      var _a;
      const result = yield (_a = database.clientInstance) == null ? void 0 : _a.query(
        `
      INSERT INTO "address" (street, city, state, zip_code, person_id) VALUES
      ($1, $2, $3, $4, $5)
      `,
        [street, city, state, zip_code, person_id]
      );
      return result == null ? void 0 : result.rows[0];
    });
  }
};

// src/use-cases/create-address.ts
var CreateAddressUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  handler(address) {
    return __async(this, null, function* () {
      return this.addressRepository.create(address);
    });
  }
};

// src/use-cases/factory/make-create-address-use-case.ts
function makeCreateAddressUseCase() {
  const addressRepository = new AddressRepository();
  const createAddressUseCase = new CreateAddressUseCase(addressRepository);
  return createAddressUseCase;
}

// src/http/controller/address/create.ts
var import_zod7 = require("zod");
function create3(request, reply) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod7.z.object({
      street: import_zod7.z.string(),
      city: import_zod7.z.string(),
      state: import_zod7.z.string(),
      zip_code: import_zod7.z.string(),
      person_id: import_zod7.z.number()
    });
    const { street, city, state, zip_code, person_id } = registerBodySchema.parse(
      request.body
    );
    const createAddressUseCase = makeCreateAddressUseCase();
    const address = yield createAddressUseCase.handler({
      street,
      city,
      state,
      zip_code,
      person_id
    });
    return reply.code(201).send(address);
  });
}

// src/use-cases/find-address-by-person.ts
var FindAddressByPersonUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  handler(personId, page, limit) {
    return __async(this, null, function* () {
      return this.addressRepository.findAddressByPersonId(personId, page, limit);
    });
  }
};

// src/use-cases/factory/make-find-address-by-person.ts
function makeFindAddressByPersonUseCase() {
  const addressRepository = new AddressRepository();
  const findAddressByPersonUseCase = new FindAddressByPersonUseCase(
    addressRepository
  );
  return findAddressByPersonUseCase;
}

// src/http/controller/address/find-address.ts
var import_zod8 = require("zod");
function findAddress(request, reply) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod8.z.object({
      personId: import_zod8.z.coerce.number()
    });
    const registerQuerySchema = import_zod8.z.object({
      page: import_zod8.z.coerce.number(),
      limit: import_zod8.z.coerce.number()
    });
    const { personId } = registerParamsSchema.parse(request.params);
    const { page, limit } = registerQuerySchema.parse(request.query);
    const findAddressByPersonUseCase = makeFindAddressByPersonUseCase();
    const address = yield findAddressByPersonUseCase.handler(
      personId,
      page,
      limit
    );
    return reply.status(200).send(address);
  });
}

// src/http/controller/address/routes.ts
function addressRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/address", create3);
    app2.get("/address/person/:personId", findAddress);
  });
}

// src/repositories/typeorm/product.repository.ts
var ProductRepository = class {
  constructor() {
    this.repository = appDataSource.getRepository(Product);
  }
  findAll(page, limit) {
    return __async(this, null, function* () {
      return this.repository.find({
        relations: ["categories"],
        skip: (page - 1) * limit,
        take: limit
      });
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      return this.repository.findOne({
        relations: ["categories"],
        where: { id }
      });
    });
  }
  create(product) {
    return __async(this, null, function* () {
      return this.repository.save(product);
    });
  }
  update(product) {
    return __async(this, null, function* () {
      return this.repository.save(product);
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      yield this.repository.delete(id);
    });
  }
};

// src/use-cases/create-product.ts
var CreateProductUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  handler(product) {
    return __async(this, null, function* () {
      return this.productRepository.create(product);
    });
  }
};

// src/use-cases/factory/make-create-product-use-case.ts
function makeCreateProductUseCase() {
  const productRepository = new ProductRepository();
  const createProductUseCase = new CreateProductUseCase(productRepository);
  return createProductUseCase;
}

// src/http/controller/product/create.ts
var import_zod9 = require("zod");
function create4(request, reply) {
  return __async(this, null, function* () {
    const registeBodySchema = import_zod9.z.object({
      name: import_zod9.z.string(),
      description: import_zod9.z.string(),
      image_url: import_zod9.z.string(),
      price: import_zod9.z.coerce.number(),
      categories: import_zod9.z.array(
        import_zod9.z.object({
          id: import_zod9.z.coerce.number().optional(),
          name: import_zod9.z.string()
        })
      ).optional()
    });
    const { name, description, image_url, price, categories } = registeBodySchema.parse(request.body);
    const createProductUseCase = makeCreateProductUseCase();
    const product = yield createProductUseCase.handler({
      name,
      description,
      image_url,
      price,
      categories
    });
    return reply.status(200).send(product);
  });
}

// src/use-cases/update-product.ts
var UpdateProductUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  handler(product) {
    return __async(this, null, function* () {
      return this.productRepository.update(product);
    });
  }
};

// src/use-cases/factory/make-update-product-use-case.ts
function makeUpdateProductUseCase() {
  const productRepository = new ProductRepository();
  const updateProductUseCase = new UpdateProductUseCase(productRepository);
  return updateProductUseCase;
}

// src/http/controller/product/update.ts
var import_zod10 = require("zod");
function update(request, reply) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod10.z.object({
      id: import_zod10.z.string()
    });
    const { id } = registerParamsSchema.parse(request.params);
    const registerBodySchema = import_zod10.z.object({
      name: import_zod10.z.string(),
      description: import_zod10.z.string(),
      image: import_zod10.z.string(),
      price: import_zod10.z.coerce.number(),
      categories: import_zod10.z.array(
        import_zod10.z.object({
          id: import_zod10.z.coerce.number(),
          name: import_zod10.z.string()
        })
      ).optional()
    });
    const { name, description, image, price, categories } = registerBodySchema.parse(request.body);
    const updateProductUseCase = makeUpdateProductUseCase();
    const product = yield updateProductUseCase.handler({
      id,
      name,
      description,
      image_url: image,
      price,
      categories: categories || []
    });
    return reply.status(200).send(product);
  });
}

// src/use-cases/find-all-products.ts
var FindAllProductsUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  handler(page, limit) {
    return __async(this, null, function* () {
      return this.productRepository.findAll(page, limit);
    });
  }
};

// src/use-cases/factory/make-find-all-products-use-case.ts
function makeFindAllProductsUseCase() {
  const productRepository = new ProductRepository();
  const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
  return findAllProductsUseCase;
}

// src/http/controller/product/find-all-products.ts
var import_zod11 = require("zod");
function findAllProduct(request, reply) {
  return __async(this, null, function* () {
    const registerQuerySchema = import_zod11.z.object({
      page: import_zod11.z.coerce.number().default(1),
      limit: import_zod11.z.coerce.number().default(10)
    });
    const { page, limit } = registerQuerySchema.parse(request.query);
    const findAllProductsUseCase = makeFindAllProductsUseCase();
    const product = yield findAllProductsUseCase.handler(page, limit);
    return reply.status(200).send(product);
  });
}

// src/use-cases/delete-product.ts
var DeleteProductUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  handler(id) {
    return __async(this, null, function* () {
      return this.productRepository.delete(id);
    });
  }
};

// src/use-cases/factory/make-delete-product-use-case.ts
function makeDeleteProductUseCase() {
  const productRepository = new ProductRepository();
  const deleteProductUseCase = new DeleteProductUseCase(productRepository);
  return deleteProductUseCase;
}

// src/http/controller/product/delete.ts
var import_zod12 = require("zod");
function deleteProduct(request, reply) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod12.z.object({
      id: import_zod12.z.coerce.string()
    });
    const { id } = registerParamsSchema.parse(request.params);
    const deleteProductUseCase = makeDeleteProductUseCase();
    yield deleteProductUseCase.handler(id);
    return reply.status(204).send();
  });
}

// src/use-cases/find-product.ts
var FindProductUseCase = class {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  handler(id) {
    return __async(this, null, function* () {
      const product = yield this.productRepository.findById(id);
      if (!product) throw new ResourceNotFoundError();
      return product;
    });
  }
};

// src/use-cases/factory/make-find-product-use-case.ts
function makeFindProductUseCase() {
  const productRepository = new ProductRepository();
  const findProductUseCase = new FindProductUseCase(productRepository);
  return findProductUseCase;
}

// src/http/controller/product/find-product.ts
var import_zod13 = require("zod");
function findProduct(request, reply) {
  return __async(this, null, function* () {
    const registerParamsSchema = import_zod13.z.object({
      id: import_zod13.z.coerce.string()
    });
    const { id } = registerParamsSchema.parse(request.params);
    const findProductUseCase = makeFindProductUseCase();
    const product = yield findProductUseCase.handler(id);
    return reply.status(200).send(product);
  });
}

// src/http/controller/product/routes.ts
function productRoutes(app2) {
  return __async(this, null, function* () {
    app2.get("/product", findAllProduct);
    app2.get("/product/:id", findProduct);
    app2.post("/product", create4);
    app2.put("/product/:id", update);
    app2.delete("/product/:id", deleteProduct);
  });
}

// src/repositories/typeorm/category.repository.ts
var CategoryRepository = class {
  constructor() {
    this.repository = appDataSource.getRepository(Category);
  }
  create(name) {
    return __async(this, null, function* () {
      yield this.repository.save({ name });
    });
  }
};

// src/use-cases/create-category.ts
var CreateCategoryUseCase = class {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  handler(name) {
    return __async(this, null, function* () {
      return this.categoryRepository.create(name);
    });
  }
};

// src/use-cases/factory/make-crate-category-use-case.ts
function makeCreateCategoryUseCase() {
  const categoryRepository = new CategoryRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  return createCategoryUseCase;
}

// src/http/controller/category/create.ts
var import_zod14 = require("zod");
function create5(request, reply) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod14.z.object({
      name: import_zod14.z.string()
    });
    const { name } = registerBodySchema.parse(request.body);
    const createCategoryUseCase = makeCreateCategoryUseCase();
    yield createCategoryUseCase.handler(name);
    return reply.status(200).send();
  });
}

// src/http/controller/category/routes.ts
function categoryRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/category", create5);
  });
}

// src/app.ts
var import_jwt = __toESM(require("@fastify/jwt"));

// src/http/middlewares/jwt-validate.ts
function validateJwt(request, reply) {
  return __async(this, null, function* () {
    try {
      const routesFreeList = ["POST-/user", "POST-/user/signin"];
      const validadeRoute = `${request.method}-${request.routerPath}`;
      if (routesFreeList.includes(validadeRoute)) return;
      yield request.jwtVerify();
    } catch (error) {
      reply.status(401).send({ message: "Unauthorized" });
    }
  });
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_jwt.default, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: "10m" }
  // tempo para o token expirar depois que o usuário fez o sign in
});
app.addHook("onRequest", validateJwt);
app.register(personRoutes);
app.register(userRoutes);
app.register(addressRoutes);
app.register(productRoutes);
app.register(categoryRoutes);
app.setErrorHandler(globalErrorHandler);

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => {
  console.log(`Servidor rodando em http://localhost:${env.PORT}`);
});
