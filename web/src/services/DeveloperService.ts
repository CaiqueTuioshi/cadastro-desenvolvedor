import axios, { AxiosPromise } from "axios";

import {Developer} from '../types/Developer'
import { PagedResponse } from "../types/Pagination";

export const findAllPagedSearch = (page: number, searchFilter: string): AxiosPromise<PagedResponse<Developer>> =>
  axios.get(`http://localhost:3333/developers?${searchFilter}`, {
    params: { page, limit: 5 }
  });

export const findById = (id: string): AxiosPromise<Developer> =>
  axios.get(`http://localhost:3333/developers/${id}`);

export const save = (developer: Developer): AxiosPromise<Developer> =>
  developer._id 
  ? axios.put(`http://localhost:3333/developers/${developer._id}`, developer) 
  : axios.post('http://localhost:3333/developers', developer)

export const remove = (id: string): AxiosPromise<Developer> =>
  axios.delete(`http://localhost:3333/developers/${id}`);