export enum HttpCode {
	OK = 200,
	CREATED = 201,
	NOT_MODIFIED = 304,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
	EXIST = 403,
}

export enum Messages {
	SOMETHING_WENT_WRONG = "Something went wrong!",
	NO_DATA_FOUND = "No data is found!",
	CREATE_FAILED = "Create is failed!",
	ORDER_CREATE_FAILED = "Order create is failed!",
	UPDATE_FAILED = "Update is failed!",
	USED_NICK_PHONE = "You are inserting already used nick or phone!",
	NO_USER_NICK = "No user found with that user nick!",
	INCORRECT_PASSWORD = "Wrong password, please try again! ",
	ADMIN_EXIST = "Admin already exist. Please sign in instead!",
	NOT_AUTHENTICATED = "You are not authenticated. Please sign up first!",
	FAILED_UPLOADING_IMAGE = "Please upload an image to continue!",
	PRODUCT_CREATION_FAILED = "Failed to create a product!",
	PRODUCT_EXIST_ERROR = "Product already exist!",
	BLOCKED_USER = "You are blocked by an admin! Contact to the admin",
	IMAGE_TYPES = "Only, jpeg, png and jpg image types are allowed!",
	TOKEN_CREATION_FAILED = "An error occurred while generating token!",
	NO_STORE_FOUND = "No grocery owner is found!",
	VALIDATION_FAILED = "Card validation failed!",
	INVALID_CARD_NUMBER = "Invalid card number.",
	INVALID_EXPIRATION_DATE = "Invalid expiration date format. Use MM/YY.",
	INVALID_CVV = "Invalid CVV. It should be 3 digits.",
	CARD_HOLDER_EMPTY = "Card holder is empty!",
	DATA_DUPLICATED = "The provided value already exists in the database.",
}

class Errors extends Error {
	public code: HttpCode;
	public message: Messages;

	static standard = {
		code: HttpCode.INTERNAL_SERVER_ERROR,
		message: Messages.SOMETHING_WENT_WRONG,
	};

	constructor(statusCode: HttpCode, statusMessage: Messages) {
		super();
		this.code = statusCode;
		this.message = statusMessage;
	}
}

export default Errors;
