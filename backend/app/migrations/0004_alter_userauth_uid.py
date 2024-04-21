# Generated by Django 4.2.11 on 2024-04-21 16:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_alter_userauth_uid"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userauth",
            name="uid",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                primary_key=True,
                serialize=False,
                to="app.userinfo",
            ),
        ),
    ]
