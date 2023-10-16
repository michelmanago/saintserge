// import prisma from '@/lib/prisma';

import prisma from '../lib/prisma';

export async function getAdherents() {
    const adherents = await prisma.adherent.findMany();

    return JSON.parse(JSON.stringify(adherents));
}

export async function getAdherent(id) {
    const adherent = await prisma.adherent.findUnique({
        where: {
            id,
        },
    });
    return JSON.parse(JSON.stringify(adherent));
}

export async function getAdherentToSendNews() {
    const adherents = await prisma.adherent.findMany({
        where: {
            news: true,
        },
    });

    return adherents;
}

export async function unsubscribeAdherent(email) {
    const res = await prisma.adherent.update({
        where: {
            email,
        },
        data: {
            news: false,
        },
    });
    return res;
}

export async function createAdherent(adherent) {
    const res = await prisma.adherent.create({
        data: adherent,
    });
    return res;
}

export async function updateAdherent(adherent) {
    const res = await prisma.adherent.update({
        where: {id: adherent.id},
        data: adherent,
    });
    return res;
}

function formatParam(params) {
    let paramFormat = {};
    if (params.nom) {
        paramFormat.nom = {startsWith: params.nom};
    }
    if (params.prenom) {
        paramFormat.prenom = {startsWith: params.prenom};
    }
    if (params.email) {
        paramFormat.email = {startsWith: params.email};
    }
    // if (params.sommeil != null) paramFormat.sommeil = params.sommeil;
    // if (params.notes) paramFormat.notes = {contains: params.notes, mode: 'insensitive'};

    return paramFormat;
}

export async function searchPaging(params /* skip = 0, take = 100 */) {
    const paramFormat = formatParam(params);
    const count = await prisma.adherent.count({
        where: paramFormat,
    });
    const results = await prisma.adherent.findMany({
        // skip,
        // take,
        where: paramFormat,
        orderBy: [
            {
                id: 'asc',
            },
        ],
    });

    return {
        // paging: {
        //     skip,
        //     take,
        //     count,
        //     totalPage: Math.ceil(count / take),
        // },
        adherents: JSON.parse(JSON.stringify(results)),
    };

    //return JSON.parse(JSON.stringify(results));
}
