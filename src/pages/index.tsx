import * as React from 'react';

import Layout from '@/components/layout/Layout';

import Seo from '@/components/Seo';
import DataTable from "@/components/data-table/DataTable";

import {QueryClient, QueryClientProvider, useQuery, useQueryClient,} from "react-query";
import {gql, request} from "graphql-request";


const HomePage = () => {
    const queryClient = new QueryClient();
    return (
        <Layout>
            <Seo/>
            <main>
                <section className='bg-white'>
                    <div className='layout flex min-h-screen flex-col items-center  text-center'>
                        <h1>
                            Les Générations de pokemons
                        </h1>
                        <QueryClientProvider client={queryClient}>
                            <PokemonGenerations/>
                        </QueryClientProvider>
                    </div>
                </section>
            </main>
        </Layout>
    );
}


const usePokemonGenerations = () => {
    const endpoint = process.env.NEXT_PUBLIC_POKEMON_API

    return useQuery("generations", async () => {
        const query = gql`
                    {
                     generations : pokemon_v2_generation {
                        name
                      }
                    }
                `
        return await request(endpoint, query).then((data) => data.generations)
    });
}

const PokemonGenerations = () => {
    const queryClient = useQueryClient();
    const {status, data, error, isFetching} = usePokemonGenerations();
    const headers = [
        {
            label: 'Index',
            className: 'px-4 py-2'
        },
        {
            label: 'Nom',
            className: 'px-4 py-2'
        }
    ];
    const formattedData: any[] = []
    data?.forEach((item: any, itemIndex: number) => {
        formattedData[itemIndex] = [itemIndex, item.name]
    })
    return (
        <div>
            {status === "loading" ? (
                "En cours de chargement..."
            ) : status === "error" ? (
                <span>Error: {error.message}</span>
            ) : (
                <DataTable headers={headers}
                           rows={formattedData}>
                </DataTable>
            )}
        </div>
    );
}


export default HomePage;
