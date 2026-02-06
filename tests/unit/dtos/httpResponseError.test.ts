import { describe, it, expect } from 'vitest';
import HttpResponseError from '../../../src/dtos/httpResponseError';

describe('HttpResponseError', () => {
  it('should create error with status code and message', () => {
    const error = new HttpResponseError(404, 'Not found');

    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not found');
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(HttpResponseError);
  });

  it('should create error with 500 status code', () => {
    const error = new HttpResponseError(500, 'Internal server error');

    expect(error.statusCode).toBe(500);
    expect(error.message).toBe('Internal server error');
  });

  it('should have correct prototype chain', () => {
    const error = new HttpResponseError(400, 'Bad request');

    expect(Object.getPrototypeOf(error)).toBe(HttpResponseError.prototype);
  });
});
