import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import pandas as pd
import os
import numpy as np

def generar_graficos_animados(pais, anio, output_path):
    os.makedirs(output_path, exist_ok=True)

    # Lectura de datos
    df_total = pd.read_csv('csv/04 share-electricity-renewables.csv')
    df_wind = pd.read_csv('csv/11 share-electricity-wind.csv')
    df_solar = pd.read_csv('csv/15 share-electricity-solar.csv')
    df_hydro = pd.read_csv('csv/07 share-electricity-hydro.csv')

    df_total = df_total.rename(columns={df_total.columns[-1]: 'Renewables'})
    df_wind = df_wind.rename(columns={df_wind.columns[-1]: 'Wind'})
    df_solar = df_solar.rename(columns={df_solar.columns[-1]: 'Solar'})
    df_hydro = df_hydro.rename(columns={df_hydro.columns[-1]: 'Hydro'})

    years = sorted(set(df_total['Year']) & set(df_wind['Year']) & set(df_solar['Year']) & set(df_hydro['Year']))
    years = [y for y in years if 1990 <= y <= 2022]

    def safe_value(val):
        if pd.isna(val) or val < 0:
            return 0
        return val

    def get_value(df, y, col):
        row = df[(df['Entity'] == pais) & (df['Year'] == y)]
        return safe_value(row[col].values[0]) if not row.empty else 0

    # --- Gráfico de Torta ---
    fig1, ax1 = plt.subplots(figsize=(6, 6))
    title1 = ax1.text(0, 1.1, '', ha='center', va='center', fontsize=14)

    def update_pie(year):
        ax1.clear()
        wind = get_value(df_wind, year, 'Wind')
        solar = get_value(df_solar, year, 'Solar')
        hydro = get_value(df_hydro, year, 'Hydro')
        total = get_value(df_total, year, 'Renewables')
        others = max(0, total - (wind + solar + hydro))
        values = [wind, solar, hydro, others]

        if sum(values) == 0:
            ax1.text(0.5, 0.5, 'No hay datos disponibles', ha='center', va='center', fontsize=14)
            ax1.axis('off')
        else:
            labels = ['Eólica', 'Solar', 'Hidro', 'Otras']
            colors = ['#4f99ff', '#ffc107', '#00c49a', '#8884d8']
            ax1.pie(values, labels=labels, autopct='%1.1f%%', colors=colors, startangle=140)
            ax1.axis('equal')

        title1.set_text(f'{pais} - Renovables (Torta) ({year})')

    ani_pie = FuncAnimation(fig1, update_pie, frames=years, repeat=False, interval=700)
    ani_pie.save(f"{output_path}/grafico_torta_renovables.gif", writer='pillow')
    plt.close(fig1)


    # --- Gráfico de Barras ---
    fig2, ax2 = plt.subplots(figsize=(8, 5))
    title2 = ax2.text(0.5, 1.05, '', ha='center', va='center', fontsize=14, transform=ax2.transAxes)

    def update_bar(year):
        ax2.clear()
        wind = get_value(df_wind, year, 'Wind')
        solar = get_value(df_solar, year, 'Solar')
        hydro = get_value(df_hydro, year, 'Hydro')
        total = get_value(df_total, year, 'Renewables')
        others = max(0, total - (wind + solar + hydro))

        values = [wind, solar, hydro, others]
        labels = ['Eólica', 'Solar', 'Hidro', 'Otras']
        colors = ['#4f99ff', '#ffc107', '#00c49a', '#8884d8']

        ax2.bar(labels, values, color=colors)
        ax2.set_ylim(0, max(100, total + 10))
        ax2.set_ylabel('Porcentaje (%)')
        ax2.set_title(f'{pais} - Renovables (Barras) - {year}')

    ani_bar = FuncAnimation(fig2, update_bar, frames=years, repeat=False, interval=700)
    ani_bar.save(f"{output_path}/grafico_barras_renovables.gif", writer='pillow')
    plt.close(fig2)


    # --- Gráfico de Líneas ---
    fig3, ax3 = plt.subplots(figsize=(8, 5))
    title3 = ax3.text(0.5, 1.05, '', ha='center', va='center', fontsize=14, transform=ax3.transAxes)

    # Preparamos las series para toda la gama de años para evitar que la animación no tenga valores previos
    def get_series(df, col):
        serie = []
        for y in years:
            val = get_value(df, y, col)
            serie.append(val)
        return serie

    wind_series = get_series(df_wind, 'Wind')
    solar_series = get_series(df_solar, 'Solar')
    hydro_series = get_series(df_hydro, 'Hydro')
    total_series = get_series(df_total, 'Renewables')

    def update_line(frame):
        ax3.clear()
        year = years[frame]

        ax3.plot(years[:frame+1], wind_series[:frame+1], label='Eólica', color='#4f99ff')
        ax3.plot(years[:frame+1], solar_series[:frame+1], label='Solar', color='#ffc107')
        ax3.plot(years[:frame+1], hydro_series[:frame+1], label='Hidro', color='#00c49a')
        ax3.plot(years[:frame+1], total_series[:frame+1], label='Total Renovables', color='#8884d8', linestyle='--')

        ax3.set_xlim(min(years), max(years))
        ax3.set_ylim(0, max(max(total_series)*1.1, 10))
        ax3.set_xlabel('Año')
        ax3.set_ylabel('Porcentaje (%)')
        ax3.legend()
        ax3.set_title(f'{pais} - Renovables (Líneas) - {year}')

    ani_line = FuncAnimation(fig3, update_line, frames=len(years), repeat=False, interval=700)
    ani_line.save(f"{output_path}/grafico_lineas_renovables.gif", writer='pillow')
    plt.close(fig3)


    # --- Gráfico de Área ---
    fig4, ax4 = plt.subplots(figsize=(8, 5))
    title4 = ax4.text(0.5, 1.05, '', ha='center', va='center', fontsize=14, transform=ax4.transAxes)

    def update_area(frame):
        ax4.clear()
        year = years[frame]

        wind_vals = wind_series[:frame+1]
        solar_vals = solar_series[:frame+1]
        hydro_vals = hydro_series[:frame+1]
        others_vals = [max(0, total_series[i] - (wind_series[i] + solar_series[i] + hydro_series[i])) for i in range(frame+1)]

        ax4.stackplot(years[:frame+1], wind_vals, solar_vals, hydro_vals, others_vals,
                      labels=['Eólica', 'Solar', 'Hidro', 'Otras'],
                      colors=['#4f99ff', '#ffc107', '#00c49a', '#8884d8'])

        ax4.set_xlim(min(years), max(years))
        ax4.set_ylim(0, max(max(total_series)*1.1, 10))
        ax4.set_xlabel('Año')
        ax4.set_ylabel('Porcentaje (%)')
        ax4.legend(loc='upper left')
        ax4.set_title(f'{pais} - Renovables (Área) - {year}')

    ani_area = FuncAnimation(fig4, update_area, frames=len(years), repeat=False, interval=700)
    ani_area.save(f"{output_path}/grafico_area_renovables.gif", writer='pillow')
    plt.close(fig4)
