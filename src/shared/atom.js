
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export let userInfo = atomWithStorage("userInfo",null);

export let userTask = atom([]);

export let isUserAuhtenticated = atom(false);


// export const userInfo = atomWithStorage('userInfo', null);        
// export const userTask = atomWithStorage('userTask', []); 
// export const isUserAuthenticated = atomWithStorage('auth', false);